import { execa } from 'execa';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { PackageManager } from '../types/index.js';

const PM_INSTALL_CMD: Record<PackageManager, string> = {
  npm: 'npm install',
  pnpm: 'pnpm install',
  bun: 'bun install',
};

export function detectPackageManager(): PackageManager {
  const bunLock = resolve(process.cwd(), 'bun.lockb');
  const bunLockText = resolve(process.cwd(), 'bun.lock');
  if (existsSync(bunLock) || existsSync(bunLockText)) return 'bun';

  const pnpmLock = resolve(process.cwd(), 'pnpm-lock.yaml');
  if (existsSync(pnpmLock)) return 'pnpm';

  try {
    execSync('which bun', { stdio: 'pipe' });
    return 'bun';
  } catch {
    return 'npm';
  }
}

export async function installDependencies(
  projectDir: string,
  packageManager: PackageManager,
): Promise<void> {
  const cmd = PM_INSTALL_CMD[packageManager];
  const [command, ...args] = cmd.split(' ');

  await execa(command, args, {
    cwd: projectDir,
    stdio: 'inherit',
    preferLocal: false,
  });
}

export async function isPackageManagerAvailable(
  pm: PackageManager,
): Promise<boolean> {
  try {
    await execa(pm, ['--version'], { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}
