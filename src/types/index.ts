export type StackType = 'maha-perf' | 'maha-grand';
export type PackageManager = 'npm' | 'pnpm' | 'bun';

export interface ProjectConfig {
  projectName: string;
  stackType: StackType;
  packageManager: PackageManager;
  enableOnboarding: boolean;
  author: string;
}

export interface TemplateContext {
  projectName: string;
  stackType: StackType;
  useZoneless: boolean;
  packageManager: PackageManager;
  enableOnboarding: boolean;
  author: string;
}

export interface EtaFileResult {
  originalPath: string;
  renderedPath: string;
}
