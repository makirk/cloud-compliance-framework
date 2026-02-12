// Core data models for the compliance framework

export type Provider = 'AWS' | 'Azure';
export type ComplianceStatus = 'Compliant' | 'Partial Compliant' | 'Not Compliant';
export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface FrameworkDetail {
  level: string;
  status: string;
}

export interface Framework {
  name: string;
  status: ComplianceStatus;
  details: FrameworkDetail[];
  sourceUrl: string;
}

export interface Assessment {
  provider: Provider;
  service: string;
  lastReviewed: string;
  frameworks: Framework[];
}

export interface Requirement {
  id: string;
  title: string;
  severity: Severity;
  service: string;
  provider: Provider;
  applicableStandards: string[];
  description: string;
  sourceUrl: string;
}

export interface CodeExample {
  provider: Provider;
  service: string;
  language: 'terraform' | 'cdk' | 'arm';
  fileName: string;
  content: string;
  path: string;
}

export interface ServiceInfo {
  provider: Provider;
  name: string;
  path: string;
  hasAssessment: boolean;
  requirementsCount: number;
  codeExamplesCount: number;
}

export interface RepoTree {
  providers: Provider[];
  services: Record<Provider, ServiceInfo[]>;
}

export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  sha: string;
  size?: number;
  download_url?: string;
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}

export interface GitHubTreeResponse {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
  truncated: boolean;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface ComplianceSummary {
  totalServices: number;
  compliantServices: number;
  partialCompliantServices: number;
  notCompliantServices: number;
  totalRequirements: number;
  criticalRequirements: number;
  highRequirements: number;
  mediumRequirements: number;
  lowRequirements: number;
}
