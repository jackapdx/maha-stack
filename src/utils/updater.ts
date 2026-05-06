import { execa } from 'execa';

const PACKAGE_NAME = 'create-maha-stack';

interface UpdateCheck {
  latest: string;
  current: string;
}

/**
 * Check the npm registry for the latest version of create-maha-stack.
 * Returns version info if an update is available, or null if already current.
 */
export async function checkForUpdate(currentVersion: string): Promise<UpdateCheck | null> {
  try {
    const { stdout } = await execa('npm', ['view', PACKAGE_NAME, 'version'], {
      stdio: 'pipe',
      timeout: 10000,
    });
    const latestVersion = stdout.trim();

    if (latestVersion !== currentVersion) {
      return { latest: latestVersion, current: currentVersion };
    }
    return null;
  } catch {
    throw new Error(
      'Failed to check for updates. Please ensure you have network connectivity and try again.',
    );
  }
}

/**
 * Install the latest version of create-maha-stack globally via npm.
 */
export async function performSelfUpdate(): Promise<void> {
  try {
    await execa('npm', ['install', '-g', `${PACKAGE_NAME}@latest`], {
      stdio: 'inherit',
    });
  } catch {
    throw new Error(
      `Update failed. You can manually update by running:\n  npm install -g ${PACKAGE_NAME}@latest`,
    );
  }
}
