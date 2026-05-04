import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import { mkdtempSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { scaffoldTemplate } from '../utils/scaffolder.js';
import type { StackType } from '../types/index.js';

function createTempDir() {
  return mkdtempSync(join(tmpdir(), 'maha-scaffold-test-'));
}

describe('scaffoldTemplate', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = createTempDir();
  });

  afterEach(() => {
    if (existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should copy maha-perf template files to the target directory', async () => {
    const targetDir = join(tempDir, 'my-project');
    const projectDir = await scaffoldTemplate('maha-perf', targetDir, false);

    expect(existsSync(projectDir)).toBe(true);

    // Root files should exist
    expect(existsSync(join(projectDir, 'package.json.eta'))).toBe(true);
    expect(existsSync(join(projectDir, 'CLAUDE.md.eta'))).toBe(true);
    expect(existsSync(join(projectDir, '.geminiignore.eta'))).toBe(true);

    // Nested directories should exist
    expect(existsSync(join(projectDir, 'apps', 'api', 'src', 'index.ts.eta'))).toBe(true);
    expect(existsSync(join(projectDir, 'apps', 'web', 'src', 'App.tsx.eta'))).toBe(true);
    expect(existsSync(join(projectDir, 'packages', 'shared', 'src', 'index.ts.eta'))).toBe(true);
  });

  it('should copy maha-grand template files to the target directory', async () => {
    const targetDir = join(tempDir, 'grand-project');
    const projectDir = await scaffoldTemplate('maha-grand', targetDir, false);

    expect(existsSync(projectDir)).toBe(true);

    // Root files
    expect(existsSync(join(projectDir, 'package.json.eta'))).toBe(true);
    expect(existsSync(join(projectDir, 'nx.json.eta'))).toBe(true);
    expect(existsSync(join(projectDir, 'CLAUDE.md.eta'))).toBe(true);

    // Nested files
    expect(existsSync(join(projectDir, 'apps', 'web', 'src', 'app.component.ts.eta'))).toBe(true);
    expect(existsSync(join(projectDir, 'apps', 'api', 'src', 'main.ts.eta'))).toBe(true);
    expect(existsSync(join(projectDir, 'libs', 'shared', 'src', 'index.ts.eta'))).toBe(true);
  });

  it('should copy shared-ui design tokens to packages/design-tokens for maha-perf', async () => {
    const targetDir = join(tempDir, 'perf-with-tokens');
    const projectDir = await scaffoldTemplate('maha-perf', targetDir, false);

    const tokensDir = join(projectDir, 'packages', 'design-tokens');
    expect(existsSync(tokensDir)).toBe(true);
    expect(existsSync(join(tokensDir, 'src', 'index.ts'))).toBe(true);
    expect(existsSync(join(tokensDir, 'src', 'tokens', 'colors.ts'))).toBe(true);
  });

  it('should copy shared-ui design tokens to libs/design-tokens for maha-grand', async () => {
    const targetDir = join(tempDir, 'grand-with-tokens');
    const projectDir = await scaffoldTemplate('maha-grand', targetDir, false);

    const tokensDir = join(projectDir, 'libs', 'design-tokens');
    expect(existsSync(tokensDir)).toBe(true);
    expect(existsSync(join(tokensDir, 'src', 'styles', 'tokens.css'))).toBe(true);
  });

  it('should include CONTRIBUTING.md.eta when enableOnboarding is true', async () => {
    const targetDir = join(tempDir, 'with-onboarding');
    const projectDir = await scaffoldTemplate('maha-perf', targetDir, true);

    expect(existsSync(join(projectDir, 'CONTRIBUTING.md.eta'))).toBe(true);
  });

  it('should not include CONTRIBUTING.md.eta when enableOnboarding is false', async () => {
    const targetDir = join(tempDir, 'no-onboarding');
    const projectDir = await scaffoldTemplate('maha-perf', targetDir, false);

    expect(existsSync(join(projectDir, 'CONTRIBUTING.md.eta'))).toBe(false);
  });

  it('should filter out node_modules and .git directories', async () => {
    const targetDir = join(tempDir, 'filtered');
    const projectDir = await scaffoldTemplate('maha-perf', targetDir, false);

    expect(existsSync(join(projectDir, 'node_modules'))).toBe(false);
    expect(existsSync(join(projectDir, '.git'))).toBe(false);
  });

  it('should create the target directory if it does not exist', async () => {
    const targetDir = join(tempDir, 'new-nested', 'deep', 'project');
    const projectDir = await scaffoldTemplate('maha-perf', targetDir, false);

    expect(existsSync(projectDir)).toBe(true);
    expect(existsSync(join(projectDir, 'package.json.eta'))).toBe(true);
  });

  it('should throw an error for an invalid stack type', async () => {
    const targetDir = join(tempDir, 'invalid-stack');
    await expect(
      scaffoldTemplate('invalid-stack' as StackType, targetDir, false),
    ).rejects.toThrow('Template not found');
  });

  it('should return the resolved project directory path', async () => {
    const targetDir = join(tempDir, 'resolve-test');
    const projectDir = await scaffoldTemplate('maha-perf', targetDir, false);

    // Should be an absolute path
    expect(projectDir.startsWith('/')).toBe(true);
    // Should resolve to the target
    expect(projectDir).toBe(targetDir);
  });
});
