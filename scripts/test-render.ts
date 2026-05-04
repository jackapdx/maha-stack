import { Eta } from 'eta';
import { readFileSync } from 'fs';
const eta = new Eta({ tags: ['<%', '%>'], autoTrim: false });
const raw = readFileSync('templates/maha-perf/package.json.eta', 'utf-8');
const result = eta.renderString(raw, { projectName: 'amm', packageManager: 'bun' });
console.log("Success! Output:");
console.log(result);
