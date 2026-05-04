const fs = require('fs');
const { execSync } = require('child_process');

const etaPath = 'templates/maha-grand/package.json.eta';
const etaContent = fs.readFileSync(etaPath, 'utf8');

// strip out eta specific syntax and convert to valid JSON roughly
let jsonRaw = etaContent
  .replace(/<% if \(it\.enableOnboarding\) { %>,/g, ',')
  .replace(/<% } %>/g, '')
  .replace(/<%= it.projectName %>/g, 'dummy');

// parse the json to get dependencies
const parsed = JSON.parse(jsonRaw);

fs.writeFileSync('temp-pkg.json', JSON.stringify({
  dependencies: parsed.dependencies,
  devDependencies: parsed.devDependencies
}, null, 2));

console.log('Running ncu on temp-pkg.json...');
execSync('npx npm-check-updates -u --packageFile temp-pkg.json', { stdio: 'inherit' });

const updated = JSON.parse(fs.readFileSync('temp-pkg.json', 'utf8'));

let finalEta = etaContent;

for (const dep of Object.keys(updated.dependencies || {})) {
  const version = updated.dependencies[dep];
  finalEta = finalEta.replace(new RegExp(`"${dep}":\\s*"[^"]+"`, 'g'), `"${dep}": "${version}"`);
}
for (const dep of Object.keys(updated.devDependencies || {})) {
  const version = updated.devDependencies[dep];
  finalEta = finalEta.replace(new RegExp(`"${dep}":\\s*"[^"]+"`, 'g'), `"${dep}": "${version}"`);
}

fs.writeFileSync(etaPath, finalEta);
console.log('Updated package.json.eta');
