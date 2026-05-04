import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to mock execa before importing
vi.mock('execa', () => ({
  execa: vi.fn().mockResolvedValue({ stdout: '', stderr: '' }),
}));

import { execa } from 'execa';
import { initGit } from '../utils/git.js';

describe('initGit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call git init, git add, and git commit in order', async () => {
    await initGit('/fake/project');

    expect(execa).toHaveBeenCalledTimes(3);

    // First call: git init
    expect(execa).toHaveBeenNthCalledWith(1, 'git', ['init', '--initial-branch=main'], expect.objectContaining({
      cwd: '/fake/project',
      stdio: 'pipe',
    }));

    // Second call: git add .
    expect(execa).toHaveBeenNthCalledWith(2, 'git', ['add', '.'], expect.objectContaining({
      cwd: '/fake/project',
      stdio: 'pipe',
    }));

    // Third call: git commit (uses inherit stdio to show progress)
    expect(execa).toHaveBeenNthCalledWith(3, 'git', ['commit', '-m', 'chore: initial commit from create-maha-stack'], expect.objectContaining({
      cwd: '/fake/project',
      stdio: 'inherit',
    }));
  });

  it('should pass the correct project directory in cwd', async () => {
    const projectDir = '/some/custom/path';
    await initGit(projectDir);

    for (const call of (execa as any).mock.calls) {
      expect(call[2].cwd).toBe(projectDir);
    }
  });

  it('should propagate errors wrapped with context', async () => {
    const gitError = new Error('git not found');
    (execa as any).mockRejectedValueOnce(gitError);

    await expect(initGit('/fake/project')).rejects.toThrow(
      'Failed to initialize git repository: git not found',
    );
  });
});
