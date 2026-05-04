import { execa } from 'execa';

export async function initGit(projectDir: string): Promise<void> {
  try {
    await execa('git', ['init', '--initial-branch=main'], {
      cwd: projectDir,
      stdio: 'pipe',
    });

    await execa('git', ['add', '.'], {
      cwd: projectDir,
      stdio: 'pipe',
    });

    await execa(
      'git',
      ['commit', '-m', 'chore: initial commit from create-maha-stack'],
      {
        cwd: projectDir,
        stdio: 'inherit',
      },
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to initialize git repository: ${message}`);
  }
}
