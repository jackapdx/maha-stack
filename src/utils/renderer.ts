import { Eta } from 'eta';
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { availableParallelism } from 'node:os';
import type { TemplateContext, EtaFileResult } from '../types/index.js';

const ETA_EXTENSION = '.eta';
const eta = new Eta({ tags: ['<%', '%>'], autoTrim: false });

async function walkDir(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  const batches = entries.map(async (entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await walkDir(fullPath);
      files.push(...nested);
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  });

  await Promise.all(batches);
  return files;
}

async function processEtaFile(
  filePath: string,
  context: TemplateContext,
): Promise<EtaFileResult> {
  const raw = await readFile(filePath, 'utf-8');
  const rendered = eta.renderString(raw, context);

  const isEta = extname(filePath) === ETA_EXTENSION;
  const targetPath = isEta ? filePath.slice(0, -ETA_EXTENSION.length) : filePath;

  await writeFile(targetPath, rendered, 'utf-8');

  if (isEta) {
    await unlink(filePath);
  }

  return {
    originalPath: filePath,
    renderedPath: targetPath,
  };
}

export async function renderTemplates(
  projectDir: string,
  context: TemplateContext,
): Promise<EtaFileResult[]> {
  const allFiles = await walkDir(projectDir);

  const configFilePattern =
    /(?:package\.json|tsconfig\..*\.json|vite\.config\.|nx\.json|angular\.json|tailwind\.config\.)/;

  const filesToProcess = allFiles.filter(
    (f) => extname(f) === ETA_EXTENSION || configFilePattern.test(f),
  );

  const CONCURRENCY = Math.max(1, availableParallelism?.() ?? 4);
  const results: EtaFileResult[] = [];

  for (let i = 0; i < filesToProcess.length; i += CONCURRENCY) {
    const batch = filesToProcess.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map((filePath) => processEtaFile(filePath, context)),
    );
    results.push(...batchResults);
  }

  return results;
}
