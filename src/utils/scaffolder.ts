import { resolve, dirname, join, sep, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { copyFile, cp, mkdir, readdir } from 'node:fs/promises';
import type { StackType } from '../types/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Filter for cp: exclude node_modules and .git/ directories by checking
 * only the relative path segments (inside the source tree), not the
 * absolute path (which may itself be under node_modules/ when installed).
 */
function createSafeFilter(baseSource: string) {
  return (src: string) => {
    const rel = relative(baseSource, src);
    // If src is the base directory itself, the relative path is "" — always copy it
    if (rel === '') return true;
    const segments = rel.split(sep);
    // Exclude entries where any relative-path segment is 'node_modules' or '.git'
    return !segments.some((seg) => seg === 'node_modules' || seg === '.git');
  };
}

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
    filter: createSafeFilter(source),
  });

  // Verify that the copy actually produced files
  const copiedEntries = await readdir(projectDir, { withFileTypes: true });
  if (copiedEntries.length === 0) {
    // cp didn't throw but produced no output — this is a critical failure
    throw new Error(
      `Template scaffold failed: no files were copied from ${source} to ${projectDir}. ` +
      'Please check disk space and permissions.'
    );
  }

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
      filter: createSafeFilter(sharedUiSource),
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
