'use client';

import { useQuery } from '@tanstack/react-query';
import { localClient } from '@/lib/api/localClient';
import { parseAssessment } from '@/lib/parsers/assessment';
import { parseRequirement } from '@/lib/parsers/requirement';
import { useComplianceStore } from '@/stores/compliance';
import { Provider, ServiceInfo, RepoTree, Assessment, Requirement } from '@/types';

export function useRepoTree() {
  const { setRepoTree, setError } = useComplianceStore();

  return useQuery({
    queryKey: ['repoTree'],
    queryFn: async (): Promise<RepoTree> => {
      try {
        // Fetch from local file system via API routes
        const tree = await localClient.getRepoTree();

        const providers: Provider[] = [];
        const services: Record<Provider, ServiceInfo[]> = {
          AWS: [],
          Azure: [],
        };

        // Parse tree to identify providers and services
        const providerDirs = new Set<string>();
        const serviceDirs = new Map<string, Set<string>>();

        tree.tree.forEach((item) => {
          const parts = item.path.split('/');

          // Check for provider directories
          if (parts.length >= 1 && (parts[0] === 'AWS' || parts[0] === 'Azure')) {
            providerDirs.add(parts[0]);

            // Check for service directories
            if (parts.length >= 2 && item.type === 'tree') {
              if (!serviceDirs.has(parts[0])) {
                serviceDirs.set(parts[0], new Set());
              }
              serviceDirs.get(parts[0])!.add(parts[1]);
            }
          }
        });

        // Build provider list
        providerDirs.forEach((p) => {
          if (p === 'AWS' || p === 'Azure') {
            providers.push(p);
          }
        });

        // Build service info
        serviceDirs.forEach((serviceSet, providerStr) => {
          const provider = providerStr as Provider;
          serviceSet.forEach((serviceName) => {
            const basePath = `${provider}/${serviceName}`;

            // Check for assessment.md
            const hasAssessment = tree.tree.some(
              (item) => item.path.toLowerCase() === `${basePath}/assessment.md`.toLowerCase()
            );

            // Count requirements
            const requirementsCount = tree.tree.filter(
              (item) =>
                item.path.startsWith(`${basePath}/Requirements/`) &&
                item.path.endsWith('.md')
            ).length;

            // Count code examples
            const codeExamplesCount = tree.tree.filter(
              (item) =>
                item.path.includes(`${basePath}/Code Example/`) &&
                (item.path.endsWith('.tf') ||
                  item.path.endsWith('.py') ||
                  item.path.endsWith('.json'))
            ).length;

            services[provider].push({
              provider,
              name: serviceName,
              path: basePath,
              hasAssessment,
              requirementsCount,
              codeExamplesCount,
            });
          });
        });

        const repoTree: RepoTree = { providers, services };
        setRepoTree(repoTree);
        return repoTree;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch repository';
        setError(message);
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

export function useAssessment(provider: Provider, service: string) {
  const { addAssessment } = useComplianceStore();
  const key = `${provider}/${service}`;

  return useQuery({
    queryKey: ['assessment', provider, service],
    queryFn: async (): Promise<Assessment> => {
      const content = await localClient.getFileContent(`${key}/assessment.md`);
      const assessment = parseAssessment(content, provider, service);
      addAssessment(key, assessment);
      return assessment;
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function useRequirements(provider: Provider, service: string) {
  const { addRequirements } = useComplianceStore();
  const key = `${provider}/${service}`;

  return useQuery({
    queryKey: ['requirements', provider, service],
    queryFn: async (): Promise<Requirement[]> => {
      // First, get the list of requirement files
      const tree = await localClient.getRepoTree();
      const requirementPaths = tree.tree
        .filter(
          (item) =>
            item.path.startsWith(`${key}/Requirements/`) &&
            item.path.endsWith('.md')
        )
        .map((item) => item.path);

      // Fetch all requirement files
      const requirements: Requirement[] = [];
      for (const path of requirementPaths) {
        try {
          const content = await localClient.getFileContent(path);
          const requirement = parseRequirement(content, provider, service);
          requirements.push(requirement);
        } catch (error) {
          console.error(`Failed to fetch requirement: ${path}`, error);
        }
      }

      // Sort by ID
      requirements.sort((a, b) => {
        const aNum = parseInt(a.id.split('.')[1] || '0');
        const bNum = parseInt(b.id.split('.')[1] || '0');
        return aNum - bNum;
      });

      addRequirements(key, requirements);
      return requirements;
    },
    staleTime: 15 * 60 * 1000,
  });
}

export function useCodeExamples(provider: Provider, service: string) {
  const key = `${provider}/${service}`;

  return useQuery({
    queryKey: ['codeExamples', provider, service],
    queryFn: async () => {
      const tree = await localClient.getRepoTree();

      // Find code example files
      const codeFiles = tree.tree.filter(
        (item) =>
          item.path.includes(`${key}/Code Example/`) &&
          item.type === 'blob' &&
          (item.path.endsWith('.tf') ||
            item.path.endsWith('.py') ||
            item.path.endsWith('.json') ||
            item.path.endsWith('.txt'))
      );

      const examples: { path: string; content: string; language: string }[] = [];

      for (const file of codeFiles) {
        try {
          const content = await localClient.getFileContent(file.path);

          // Determine language
          let language = 'text';
          if (file.path.includes('/terraform/') || file.path.endsWith('.tf')) {
            language = 'terraform';
          } else if (file.path.includes('/cdk/') || file.path.endsWith('.py')) {
            language = 'python';
          } else if (file.path.includes('/arm/') || file.path.endsWith('.json')) {
            language = 'json';
          }

          examples.push({
            path: file.path,
            content,
            language,
          });
        } catch (error) {
          console.error(`Failed to fetch code example: ${file.path}`, error);
        }
      }

      return examples;
    },
    staleTime: 15 * 60 * 1000,
  });
}
