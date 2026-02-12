import { create } from 'zustand';
import { Assessment, Requirement, CodeExample, ServiceInfo, Provider, RepoTree, ComplianceSummary } from '@/types';

interface ComplianceState {
  // Data
  repoTree: RepoTree | null;
  assessments: Map<string, Assessment>;
  requirements: Map<string, Requirement[]>;
  codeExamples: Map<string, CodeExample[]>;

  // UI State
  isLoading: boolean;
  error: string | null;
  selectedProvider: Provider | null;
  selectedService: string | null;
  searchQuery: string;
  filters: {
    severity: string[];
    provider: Provider[];
    framework: string[];
  };

  // GitHub Config
  githubConfig: {
    owner: string;
    repo: string;
    branch: string;
    token?: string;
  };

  // Actions
  setRepoTree: (tree: RepoTree) => void;
  addAssessment: (key: string, assessment: Assessment) => void;
  addRequirements: (key: string, requirements: Requirement[]) => void;
  addCodeExamples: (key: string, examples: CodeExample[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedProvider: (provider: Provider | null) => void;
  setSelectedService: (service: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<ComplianceState['filters']>) => void;
  setGitHubConfig: (config: Partial<ComplianceState['githubConfig']>) => void;

  // Computed
  getServiceKey: (provider: Provider, service: string) => string;
  getAssessment: (provider: Provider, service: string) => Assessment | undefined;
  getRequirements: (provider: Provider, service: string) => Requirement[];
  getAllRequirements: () => Requirement[];
  getComplianceSummary: () => ComplianceSummary;
}

export const useComplianceStore = create<ComplianceState>((set, get) => ({
  // Initial data
  repoTree: null,
  assessments: new Map(),
  requirements: new Map(),
  codeExamples: new Map(),

  // Initial UI state
  isLoading: false,
  error: null,
  selectedProvider: null,
  selectedService: null,
  searchQuery: '',
  filters: {
    severity: [],
    provider: [],
    framework: [],
  },

  // GitHub config
  githubConfig: {
    owner: 'your-org',
    repo: 'cloud-compliance-framework',
    branch: 'main',
  },

  // Actions
  setRepoTree: (tree) => set({ repoTree: tree }),

  addAssessment: (key, assessment) => set((state) => {
    const newAssessments = new Map(state.assessments);
    newAssessments.set(key, assessment);
    return { assessments: newAssessments };
  }),

  addRequirements: (key, requirements) => set((state) => {
    const newRequirements = new Map(state.requirements);
    newRequirements.set(key, requirements);
    return { requirements: newRequirements };
  }),

  addCodeExamples: (key, examples) => set((state) => {
    const newExamples = new Map(state.codeExamples);
    newExamples.set(key, examples);
    return { codeExamples: newExamples };
  }),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  setSelectedService: (service) => set({ selectedService: service }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),

  setGitHubConfig: (config) => set((state) => ({
    githubConfig: { ...state.githubConfig, ...config },
  })),

  // Computed helpers
  getServiceKey: (provider, service) => `${provider}/${service}`,

  getAssessment: (provider, service) => {
    const key = `${provider}/${service}`;
    return get().assessments.get(key);
  },

  getRequirements: (provider, service) => {
    const key = `${provider}/${service}`;
    return get().requirements.get(key) || [];
  },

  getAllRequirements: () => {
    const allReqs: Requirement[] = [];
    get().requirements.forEach((reqs) => {
      allReqs.push(...reqs);
    });
    return allReqs;
  },

  getComplianceSummary: () => {
    const assessments = Array.from(get().assessments.values());
    const allRequirements = get().getAllRequirements();

    let compliant = 0;
    let partialCompliant = 0;
    let notCompliant = 0;

    assessments.forEach((assessment) => {
      const hasNonCompliant = assessment.frameworks.some(f => f.status === 'Not Compliant');
      const hasPartial = assessment.frameworks.some(f => f.status === 'Partial Compliant');
      const allCompliant = assessment.frameworks.every(f => f.status === 'Compliant');

      if (allCompliant) {
        compliant++;
      } else if (hasNonCompliant) {
        notCompliant++;
      } else if (hasPartial) {
        partialCompliant++;
      }
    });

    return {
      totalServices: assessments.length,
      compliantServices: compliant,
      partialCompliantServices: partialCompliant,
      notCompliantServices: notCompliant,
      totalRequirements: allRequirements.length,
      criticalRequirements: allRequirements.filter(r => r.severity === 'Critical').length,
      highRequirements: allRequirements.filter(r => r.severity === 'High').length,
      mediumRequirements: allRequirements.filter(r => r.severity === 'Medium').length,
      lowRequirements: allRequirements.filter(r => r.severity === 'Low').length,
    };
  },
}));
