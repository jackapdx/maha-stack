import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { renderTemplates } from '../utils/renderer.js';
import type { TemplateContext } from '../types/index.js';

function createTempDir() {
  return mkdtempSync(join(tmpdir(), 'maha-renderer-test-'));
}

const testContext: TemplateContext = {
  projectName: 'test-project',
  author: 'Test Author',
  stackType: 'maha-perf',
  useZoneless: true,
  packageManager: 'bun',
  enableOnboarding: true,
};

describe('renderTemplates', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = createTempDir();
  });

  afterEach(() => {
    rmSync(tempDir, { recursive: true, force: true });
  });

  it('should render .eta files and remove the .eta extension', async () => {
    const nestedDir = join(tempDir, 'packages', 'shared');
    mkdirSync(nestedDir, { recursive: true });

    // Write a simple .eta template
    writeFileSync(
      join(nestedDir, 'package.json.eta'),
      JSON.stringify({ name: '<%= it.projectName %>', author: '<%= it.author %>' }),
    );

    const results = await renderTemplates(tempDir, testContext);

    // Check the rendered file exists without .eta extension
    const renderedPath = join(nestedDir, 'package.json');
    expect(existsSync(renderedPath)).toBe(true);

    // Check the .eta file was removed
    expect(existsSync(join(nestedDir, 'package.json.eta'))).toBe(false);

    // Check content was rendered correctly
    const renderedContent = JSON.parse(readFileSync(renderedPath, 'utf-8'));
    expect(renderedContent.name).toBe('test-project');
    expect(renderedContent.author).toBe('Test Author');

    // Check results
    const result = results.find((r) => r.originalPath.includes('package.json.eta'));
    expect(result).toBeDefined();
    expect(result!.renderedPath).toBe(renderedPath);
  });

  it('should render multiple .eta files in nested directories', async () => {
    const dir1 = join(tempDir, 'apps', 'api', 'src');
    const dir2 = join(tempDir, 'apps', 'web', 'src');
    mkdirSync(dir1, { recursive: true });
    mkdirSync(dir2, { recursive: true });

    writeFileSync(join(dir1, 'index.ts.eta'), '// Project: <%= it.projectName %>');
    writeFileSync(join(dir2, 'App.tsx.eta'), '// Author: <%= it.author %>');
    // Non-eta file should be left alone
    writeFileSync(join(dir2, 'styles.css'), 'body { color: red; }');

    const results = await renderTemplates(tempDir, testContext);

    expect(results.length).toBe(2);

    // First file
    const apiIndex = join(dir1, 'index.ts');
    expect(existsSync(apiIndex)).toBe(true);
    expect(existsSync(join(dir1, 'index.ts.eta'))).toBe(false);
    expect(readFileSync(apiIndex, 'utf-8')).toContain('test-project');

    // Second file
    const appTsx = join(dir2, 'App.tsx');
    expect(existsSync(appTsx)).toBe(true);
    expect(readFileSync(appTsx, 'utf-8')).toContain('Test Author');

    // Non-eta file untouched
    expect(existsSync(join(dir2, 'styles.css'))).toBe(true);
  });

  it('should render conditional Eta blocks correctly', async () => {
    const enabledDir = join(tempDir, 'with-feature');
    const disabledDir = join(tempDir, 'without-feature');
    mkdirSync(enabledDir, { recursive: true });
    mkdirSync(disabledDir, { recursive: true });

    const template = JSON.stringify({ extra: '<% if (it.enableOnboarding) { %>yes<% } else { %>no<% } %>' });

    writeFileSync(join(enabledDir, 'config.json.eta'), template);
    writeFileSync(join(disabledDir, 'config.json.eta'), template);

    // Render with enableOnboarding = true
    const enabledCtx = { ...testContext, enableOnboarding: true };
    const resultsEnabled = await renderTemplates(enabledDir, enabledCtx);
    expect(resultsEnabled.length).toBe(1);

    const enabledContent = JSON.parse(readFileSync(join(enabledDir, 'config.json'), 'utf-8'));
    expect(enabledContent.extra).toBe('yes');

    // Render with enableOnboarding = false
    const disabledCtx = { ...testContext, enableOnboarding: false };
    const resultsDisabled = await renderTemplates(disabledDir, disabledCtx);
    expect(resultsDisabled.length).toBe(1);

    const disabledContent = JSON.parse(readFileSync(join(disabledDir, 'config.json'), 'utf-8'));
    expect(disabledContent.extra).toBe('no');
  });

  it('should handle an empty project directory gracefully', async () => {
    const emptyDir = join(tempDir, 'empty');
    mkdirSync(emptyDir, { recursive: true });

    const results = await renderTemplates(emptyDir, testContext);
    expect(results).toEqual([]);
  });

  it('should not process non-eta files that do not match config patterns', async () => {
    const dir = join(tempDir, 'plain-files');
    mkdirSync(dir, { recursive: true });

    writeFileSync(join(dir, 'readme.md'), '# Hello');
    writeFileSync(join(dir, 'index.ts'), 'export const x = 1;');
    writeFileSync(join(dir, 'styles.css'), '.foo {}');

    const results = await renderTemplates(dir, testContext);
    expect(results.length).toBe(0);

    // Files should be unchanged
    expect(readFileSync(join(dir, 'readme.md'), 'utf-8')).toBe('# Hello');
    expect(readFileSync(join(dir, 'index.ts'), 'utf-8')).toBe('export const x = 1;');
  });

  it('should process config files that match the configFilePattern (e.g. package.json)', async () => {
    const dir = join(tempDir, 'config-files');
    mkdirSync(dir, { recursive: true });

    // A plain package.json (no .eta extension) that matches configFilePattern
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: '<%= it.projectName %>' }));

    const results = await renderTemplates(dir, testContext);

    // The config file pattern should cause it to be processed
    // Since there's Eta syntax in the file, it will render
    expect(results.length).toBe(1);
    const content = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf-8'));
    expect(content.name).toBe('test-project');
  });

  it('should use correct render path (handle Windows vs Unix separators)', async () => {
    const dir = join(tempDir, 'path-test');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'test.ts.eta'), '// <%= it.projectName %>');

    const results = await renderTemplates(dir, testContext);

    expect(results.length).toBe(1);
    const result = results[0]!;
    // The rendered path should end with .ts (not .eta)
    expect(result.renderedPath.endsWith('.ts')).toBe(true);
    expect(result.renderedPath.endsWith('.eta')).toBe(false);
    // The rendered path should use the OS separator
    expect(result.renderedPath).toContain(sep);
  });

  it('should render projectName into template text content', async () => {
    const dir = join(tempDir, 'content-test');
    mkdirSync(dir, { recursive: true });

    writeFileSync(
      join(dir, 'CLAUDE.md.eta'),
      '# <%= it.projectName %> - Developer Guide\n\nProject by <%= it.author %>',
    );

    const results = await renderTemplates(dir, testContext);
    expect(results.length).toBe(1);

    const content = readFileSync(join(dir, 'CLAUDE.md'), 'utf-8');
    expect(content).toContain('# test-project - Developer Guide');
    expect(content).toContain('Project by Test Author');
  });

  it('should handle special characters in template values', async () => {
    const dir = join(tempDir, 'special-chars');
    mkdirSync(dir, { recursive: true });

    const specialCtx: TemplateContext = {
      ...testContext,
      projectName: 'my-project@special',
      author: 'John "JD" Doe',
    };

    writeFileSync(join(dir, 'info.txt.eta'), 'Name: <%= it.projectName %>, Author: <%= it.author %>');

    const results = await renderTemplates(dir, specialCtx);
    expect(results.length).toBe(1);

    const content = readFileSync(join(dir, 'info.txt'), 'utf-8');
    expect(content).toContain('my-project@special');
    // Eta auto-escapes HTML entities (" becomes &quot;)
    expect(content).toContain('John &quot;JD&quot; Doe');
  });
});
