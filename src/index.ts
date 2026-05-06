#!/usr/bin/env node
import * as clack from '@clack/prompts';
import pc from 'picocolors';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { collectConfig } from './utils/prompts.js';
import { scaffoldTemplate } from './utils/scaffolder.js';
import { renderTemplates } from './utils/renderer.js';
import { initGit } from './utils/git.js';
import { installDependencies, isPackageManagerAvailable } from './utils/runner.js';
import { checkForUpdate, performSelfUpdate } from './utils/updater.js';
import type { TemplateContext } from './types/index.js';
import packageJson from '../package.json' with { type: 'json' };

const VERSION = packageJson.version;

function showHelp() {
  console.log(`
${pc.bold(pc.yellow('create-maha-stack'))} ${pc.dim(`v${VERSION}`)}

${pc.bold('Usage:')}
  npx create-maha-stack               Start the interactive project generator
  npx create-maha-stack --help        Show this help message
  npx create-maha-stack --version     Show version number
  npx create-maha-stack --self-update Update to the latest version

${pc.bold('Stacks:')}
  ${pc.yellow('maha-perf')}   Modern speed: Hono + React 19 + Zod | Bun Monorepo
  ${pc.yellow('maha-grand')}  Enterprise scale: NestJS + Angular 21 + Zod | PNPM Monorepo

${pc.bold('Options:')}
  (All options are configured interactively — no CLI flags needed.)
`);
}

function showVersion() {
  console.log(`${VERSION}`);
}

async function main() {
  // Handle CLI flags
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }
  if (args.includes('--version') || args.includes('-v')) {
    showVersion();
    process.exit(0);
  }
  if (args.includes('--self-update')) {
    console.log(pc.bold(pc.yellow('create-maha-stack')) + pc.dim(` self-update\n`));
    try {
      const result = await checkForUpdate(VERSION);
      if (!result) {
        console.log(pc.green(`\nAlready up to date! v${VERSION} is the latest version.`));
        process.exit(0);
      }
      console.log(`${pc.dim('Current:')} v${result.current}`);
      console.log(`${pc.green('Latest: ')} v${result.latest}\n`);

      const confirm = await clack.confirm({
        message: `Update create-maha-stack to v${result.latest}?`,
      });
      if (clack.isCancel(confirm) || !confirm) {
        console.log(pc.dim('Update skipped.'));
        process.exit(0);
      }

      const s = clack.spinner();
      s.start('Updating create-maha-stack…');
      await performSelfUpdate();
      s.stop(`Updated to v${result.latest}`);
      clack.log.success(`create-maha-stack is now at v${result.latest}`);
    } catch (err) {
      console.log(pc.red(err instanceof Error ? err.message : String(err)));
      process.exit(1);
    }
    process.exit(0);
  }

  // 1. Visual Identity
  const title = figlet.textSync('MAHA', { font: 'Slant' });
  const mahaGradient = gradient(['#FFD700', '#FF8C00', '#FF4500']); // Gold to Orange
  
  console.log('\n' + mahaGradient.multiline(title));
  console.log(pc.bold(pc.yellow('  The "Great" Stack Generator')) + '\n');

  // 2. Collection
  const config = await collectConfig();
  if (!config) {
    process.exit(1);
    return;
  }

  const s = clack.spinner();

  // Pre-flight: verify the required package manager is available
  const pmAvailable = await isPackageManagerAvailable(config.packageManager);
  if (!pmAvailable) {
    clack.log.warn(
      `${pc.yellow('Warning:')} ${pc.bold(config.packageManager)} was not found on your system. ` +
      `The CLI will attempt to use it anyway. If installation fails, install ${config.packageManager} first.`,
    );
  }

  const templateContext: TemplateContext = {
    projectName: config.projectName,
    author: config.author,
    stackType: config.stackType,
    useZoneless: true, // Defaulting to Angular Zoneless for Maha-Grand
    packageManager: config.packageManager,
    enableOnboarding: config.enableOnboarding,
  };

  try {
    // 3. Fetch -> Transform -> Cleanup Pipeline
    s.start('Preparing project foundations…');
    const projectDir = await scaffoldTemplate(
      config.stackType,
      config.projectName,
      config.enableOnboarding,
    );
    s.stop('Foundations prepared');

    s.start('Infusing performance (Rendering templates)…');
    const results = await renderTemplates(projectDir, templateContext);
    s.stop(`Maha stack infused into ${results.length} file(s)`);

    s.start(`Installing dependencies with ${config.packageManager}…`);
    await installDependencies(projectDir, config.packageManager);
    s.stop('Dependencies established');

    s.start('Initializing repository…');
    await initGit(projectDir);
    s.stop('Repository ready');

    // 4. Outro
    clack.note(
      [
        `${pc.bold('cd')} ${config.projectName}`,
        '',
        `${pc.dim('Run:')}   ${config.packageManager} run dev`,
      ].join('\n'),
      'Next steps'
    );

    clack.outro(mahaGradient('  May your build be Great. มหาสำเร็จ!  '));
  } catch (err) {
    s.stop('Failed');
    clack.cancel(
      pc.red(`Error: ${err instanceof Error ? err.message : String(err)}`),
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
