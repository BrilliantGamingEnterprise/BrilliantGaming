import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const files = ['styles.css', 'directory-layout.css', 'components.css'];
const errors = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  let depth = 0;
  let quote = '';
  let comment = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (comment) {
      if (char === '*' && next === '/') { comment = false; index += 1; }
      continue;
    }
    if (!quote && char === '/' && next === '*') { comment = true; index += 1; continue; }
    if (quote) {
      if (char === '\\') { index += 1; continue; }
      if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'") { quote = char; continue; }
    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (depth < 0) { errors.push(`${file}: unexpected closing brace`); break; }
  }
  if (comment) errors.push(`${file}: unclosed comment`);
  if (quote) errors.push(`${file}: unclosed string`);
  if (depth !== 0) errors.push(`${file}: unbalanced braces (${depth})`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}
console.log(`Validated ${files.length} CSS files.`);
