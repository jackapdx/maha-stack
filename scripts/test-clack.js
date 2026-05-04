import * as clack from '@clack/prompts';

async function main() {
  const c = await clack.group({
    a: () => clack.text({ message: 'a' }),
    b: ({ results }) => {
      clack.log.info('Skipping b');
      return Promise.resolve('bun');
    }
  });
  console.log(c);
}
main();
