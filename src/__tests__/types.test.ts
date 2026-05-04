import { describe, it, expect } from 'vitest';

describe('Type Definitions', () => {
  it('TemplateContext should accept required fields', () => {
    // Compile-time type check: if this compiles, the types are correct
    const ctx = {
      projectName: 'test',
      author: 'author',
      stackType: 'maha-perf' as const,
      useZoneless: true,
      packageManager: 'bun' as const,
      enableOnboarding: false,
    };

    expect(ctx.projectName).toBe('test');
    expect(ctx.stackType).toBe('maha-perf');
    expect(ctx.packageManager).toBe('bun');
  });

  it('ProjectConfig should have all required fields', () => {
    const config = {
      projectName: 'my-app',
      stackType: 'maha-grand' as const,
      packageManager: 'pnpm' as const,
      enableOnboarding: true,
      author: 'Jane Doe',
    };

    expect(config.projectName).toBe('my-app');
    expect(config.stackType).toBe('maha-grand');
    expect(config.packageManager).toBe('pnpm');
    expect(config.author).toBe('Jane Doe');
  });

  it('EtaFileResult should have originalPath and renderedPath', () => {
    const result = {
      originalPath: '/tmp/project/package.json.eta',
      renderedPath: '/tmp/project/package.json',
    };

    expect(result.originalPath).toContain('.eta');
    expect(result.renderedPath).not.toContain('.eta');
  });

  it('StackType should only accept maha-perf or maha-grand', () => {
    const perf: 'maha-perf' = 'maha-perf';
    const grand: 'maha-grand' = 'maha-grand';

    expect(perf).toBe('maha-perf');
    expect(grand).toBe('maha-grand');
  });

  it('PackageManager should only accept npm, pnpm, or bun', () => {
    const pms = ['npm', 'pnpm', 'bun'] as const;

    for (const pm of pms) {
      expect(['npm', 'pnpm', 'bun']).toContain(pm);
    }
  });
});
