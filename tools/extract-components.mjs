import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const layoutPath = path.join(root, 'directory-layout.css');
let layout = fs.readFileSync(layoutPath, 'utf8');

function extract(startMarker, endMarker = null) {
  const start = layout.indexOf(startMarker);
  const end = endMarker ? layout.indexOf(endMarker, start) : layout.length;
  if (start < 0 || end < 0) throw new Error(`Cannot extract ${startMarker}`);
  const text = layout.slice(start, end).trim();
  layout = layout.slice(0, start) + layout.slice(end);
  return text;
}

const policy = extract('/* Service and privacy policy */', '/* Keep the selected Option C controls');
const newComponents = extract('/* Mobile cart dock: visible only when the current game cart has items. */');
const components = `/* Brilliant Gaming isolated UI components.\n * New components live here instead of adding another override layer to legacy styles.\n */\n\n${policy}\n\n${newComponents}\n`;

fs.writeFileSync(layoutPath, layout.trimEnd() + '\n');
fs.writeFileSync(path.join(root, 'components.css'), components);

for (const name of fs.readdirSync(root).filter((file) => file.endsWith('.html'))) {
  const filePath = path.join(root, name);
  let source = fs.readFileSync(filePath, 'utf8');
  if (!source.includes('components.css')) {
    source = source.replace(/(<link rel="stylesheet" href="directory-layout\.css[^>]*>)/, '$1\n  <link rel="stylesheet" href="components.css?v=1" />');
    fs.writeFileSync(filePath, source);
  }
}

console.log('New UI components extracted from the legacy override file.');
