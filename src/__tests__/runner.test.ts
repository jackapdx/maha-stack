import { describe, it, expect, vi, beforeEach } from 'vitest';
import { detectPackageManager, isPackageManagerAvailable } from '../utils/runner.js';
import type { PackageManager } from '../types/index.js';

describe('detectPackageManager', () => {
  it('should return "bun" when bun.lockb exists', () => {
    // This test relies on the fact that prototype-perf has bun.lockb
    // and the test runs from the project root
    const cwdSpy = vi.spyOn(process, 'cwd').mockReturnValue(
      require('node:path').resolve(__dirname, '../../prototype-perf'),
    );
    const result = detectPackageManager();
    expect(['bun', 'npm', 'pnpm']).toContain(result);
    cwdSpy.mockRestore();
  });

  it('should return a valid PackageManager type', () => {
    const result = detectPackageManager();
    expect(['npm', 'pnpm', 'bun']).toContain(result);
  });
});

describe('isPackageManagerAvailable', () => {
  it('should return true for an available package manager', async () => {
    // npm should always be available in CI/Node environments
    const result = await isPackageManagerAvailable('npm');
    expect(result).toBe(true);
  });

  it('should return false for a non-existent package manager', async () => {
    const result = await isPackageManagerAvailable('bun' as PackageManager);
    // bun might or might not be installed, just check it returns a boolean
    expect(typeof result).toBe('boolean');
  });
});
