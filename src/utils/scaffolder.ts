import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { copyFile, cp, mkdir } from 'node:fs/promises';
import type { StackType } from '../types/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getTemplatesRoot() {
  // In development, __dirname is project_root/src/utils
  // In production (dist), __dirname is project_root/dist
  const paths = [
    join(__dirname, '../../templates'), // dev
    join(__dirname, '../templates'),    // prod
  ];

  for (const p of paths) {
    if (existsSync(p)) return p;
  }
  return null;
}

export async function scaffoldTemplate(
  stackType: StackType,
  targetDir: string,
  enableOnboarding: boolean = false
): Promise<string> {
  const templatesRoot = getTemplatesRoot();
  if (!templatesRoot) {
    throw new Error('Templates directory not found. Please ensure the package is correctly installed.');
  }

  const source = join(templatesRoot, stackType);
  if (!existsSync(source)) {
    throw new Error(`Template not found: ${stackType}`);
  }

  const projectDir = resolve(targetDir);
  
  // Ensure target directory exists
  await mkdir(projectDir, { recursive: true });

  // Use native fs.cp (recursive) for local templates
  // This is more reliable for local files than giget
  await cp(source, projectDir, { 
    recursive: true,
    force: true,
    filter: (src) => !src.includes('node_modules') && !src.includes('.git')
  });

  // Copy shared UI design tokens (framework-agnostic, works for both stacks)
  const sharedUiSource = join(templatesRoot, 'shared-ui');
  if (existsSync(sharedUiSource)) {
    const sharedUiDest = join(
      projectDir,
      stackType === 'maha-perf' ? 'packages/design-tokens' : 'libs/design-tokens',
    );
    await cp(sharedUiSource, sharedUiDest, {
      recursive: true,
      force: true,
      filter: (src) => !src.includes('node_modules'),
    });
  }

  // Handle onboarding files
  if (enableOnboarding) {
    const contributingEta = join(templatesRoot, 'CONTRIBUTING.md.eta');
    if (existsSync(contributingEta)) {
      await copyFile(contributingEta, join(projectDir, 'CONTRIBUTING.md.eta'));
    }
  }

  return projectDir;
}
