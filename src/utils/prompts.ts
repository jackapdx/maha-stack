import * as clack from '@clack/prompts';
import pc from 'picocolors';
import type { ProjectConfig, StackType, PackageManager } from '../types/index.js';

const PM_CHOICES: { value: PackageManager; label: string; hint: string }[] = [
  { value: 'pnpm', label: 'pnpm', hint: 'Efficient disk usage' },
  { value: 'bun', label: 'Bun', hint: 'Blazing fast' },
  { value: 'npm', label: 'npm', hint: 'Universal default' },
];

export async function collectConfig(): Promise<ProjectConfig | null> {
  const config = await clack.group(
    {
      projectName: () =>
        clack.text({
          message: 'What is the name of your Great project?',
          placeholder: 'maha-project',
          validate: (v) => {
            if (!v?.trim()) return 'Project name is required';
            if (!/^[a-z0-9-_]+$/i.test(v))
              return 'Use only letters, numbers, dashes, or underscores';
          },
        }),

      author: () =>
        clack.text({
          message: 'Who is the Great Architect? (Author name)',
          placeholder: 'Architect',
          validate: (v) => {
            if (!v?.trim()) return 'Author name is required';
          },
        }),

      stackType: () =>
        clack.select({
          message: 'Choose your Great Stack Path',
          options: [
            {
              value: 'maha-perf' as StackType,
              label: 'Maha-Perf (Modern Speed)',
              hint: 'Hono + React 19 + Zod | Bun Monorepo',
            },
            {
              value: 'maha-grand' as StackType,
              label: 'Maha-Grand (Enterprise Scale)',
              hint: 'NestJS + Angular 21 + Zod | PNPM Monorepo',
            },
          ],
        }),

      packageManager: ({ results }) => {
        if (results.stackType === 'maha-perf') {
          clack.log.info(`${pc.cyan('ℹ')} Maha-Perf is locked to ${pc.bold('bun')} for maximum performance.`);
          return Promise.resolve('bun' as PackageManager);
        }
        clack.log.info(`${pc.cyan('ℹ')} Maha-Grand is locked to ${pc.bold('pnpm')} for robust enterprise dependency management.`);
        return Promise.resolve('pnpm' as PackageManager);
      },

      enableOnboarding: () =>
        clack.confirm({
          message: 'Include Intern Onboarding Docs? (CONTRIBUTING.md + commitlint)',
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        clack.cancel('Build cancelled.');
        process.exit(0);
      },
    }
  );

  return config as ProjectConfig;
}
