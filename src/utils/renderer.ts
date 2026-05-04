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
  filePath2: string,
  context: TemplateContext,
): Promise<EtaFileResult> {
  try {
    const raw = await readFile(filePath2, 'utf-8');
    const rendered = eta.renderString(raw, context);

    const isEta = extname(filePath2) === ETA_EXTENSION;
    const targetPath = isEta ? filePath2.slice(0, -ETA_EXTENSION.length) : filePath2;

    await writeFile(targetPath, rendered, 'utf-8');

    if (isEta) {
      await unlink(filePath2);
    }

    return {
      originalPath: filePath2,
      renderedPath: targetPath,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to render ${filePath2}: ${message}`);
  }
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
    const settled = await Promise.allSettled(
      batch.map((filePath) => processEtaFile(filePath, context)),
    );
    for (const result of settled) {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        // Log the error but continue processing remaining files
        console.error(`  ⚠️ ${result.reason instanceof Error ? result.reason.message : String(result.reason)}`);
      }
    }
  }

  return results;
}
