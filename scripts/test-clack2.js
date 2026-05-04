import * as clack from '@clack/prompts';

async function main() {
  const c = await clack.group({
    a: () => Promise.resolve('bun')
  });
  console.log(c);
}
main();
