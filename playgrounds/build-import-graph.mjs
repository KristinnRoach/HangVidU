#!/usr/bin/env node
// Scans src/ for imports, classifies each side against the element types
// defined in eslint.boundaries.config.js, and writes
// playgrounds/boundary-imports.json — consumed by boundary-rules.html so
// edges can show the underlying file imports.
//
// Re-uses the live ESLint config so element patterns stay in sync.

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, relative, dirname, resolve, sep, posix } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const srcRoot = join(repoRoot, 'src');
const configPath = join(repoRoot, 'eslint.boundaries.config.js');
const outPath = join(__dirname, 'boundary-imports.json');

const SRC_EXTS = ['.js', '.jsx', '.ts', '.tsx'];

// ---------- glob → regex ----------
// Patterns used in the config are simple: src/x/*.{js,jsx,ts,tsx} and
// src/x/**/*.{js,jsx,ts,tsx}. This covers them without pulling in picomatch.
function globToRegex(glob) {
  // Expand {a,b,c}
  const expanded = glob.replace(/\{([^}]+)\}/g, (_, inner) => `(${inner.split(',').join('|')})`);
  let re = '';
  for (let i = 0; i < expanded.length; i++) {
    const c = expanded[i];
    const next = expanded[i + 1];
    if (c === '*' && next === '*') {
      re += '.*';
      i++;
      // swallow following slash so `**/x` and `x` both match
      if (expanded[i + 1] === '/') i++;
    } else if (c === '*') {
      re += '[^/]*';
    } else if (c === '?') {
      re += '[^/]';
    } else if (c === '(' || c === ')' || c === '|') {
      // emitted by brace expansion above — keep as regex metachars
      re += c;
    } else if ('.+^$[]\\'.includes(c)) {
      re += '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$');
}

// ---------- load config & build classifier ----------
async function loadElements() {
  const mod = await import(pathToFileURL(configPath).href);
  const config = mod.default;
  const elementsCfg = config.find((c) => c.settings && c.settings['boundaries/elements']);
  if (!elementsCfg) throw new Error('No boundaries/elements in config');
  const raw = elementsCfg.settings['boundaries/elements'];
  return raw.map((e) => ({
    type: e.type,
    patterns: (Array.isArray(e.pattern) ? e.pattern : [e.pattern]).map((p) => ({
      glob: p,
      re: globToRegex(p),
    })),
  }));
}

function classify(elements, relPath) {
  // relPath is posix, repo-rooted (e.g. "src/auth/foo.ts")
  for (const el of elements) {
    if (el.patterns.some((p) => p.re.test(relPath))) return el.type;
  }
  return null;
}

// ---------- walk src/ ----------
async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
      await walk(full, acc);
    } else if (ent.isFile()) {
      if (SRC_EXTS.some((x) => ent.name.endsWith(x))) acc.push(full);
    }
  }
  return acc;
}

// ---------- tsconfig path aliases ----------
// Mirror the `@x/*` aliases so alias imports resolve to real files (otherwise
// they look like npm packages and their edges silently disappear).
async function loadAliases() {
  const raw = await readFile(join(repoRoot, 'tsconfig.json'), 'utf8');
  const json = JSON.parse(raw);
  const paths = json.compilerOptions?.paths ?? {};
  const aliases = [];
  for (const [key, targets] of Object.entries(paths)) {
    if (!key.endsWith('/*') || !targets?.length) continue;
    // '@lib/*' -> prefix '@lib/'; './src/lib/*' -> target 'src/lib/'
    aliases.push({
      prefix: key.slice(0, -1),
      target: targets[0].replace(/^\.\//, '').slice(0, -1),
    });
  }
  return aliases;
}

// ---------- import resolution ----------
async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function resolveImport(fromFile, spec, aliases) {
  let target;
  if (spec.startsWith('.')) {
    target = resolve(dirname(fromFile), spec);
  } else {
    const alias = aliases.find((a) => spec.startsWith(a.prefix));
    if (!alias) return null; // npm pkg, skip
    target = resolve(repoRoot, alias.target + spec.slice(alias.prefix.length));
  }
  // If the spec already ends in a known extension, try it as-is first,
  // then try swapping .js↔.ts / .jsx↔.tsx (TS NodeNext convention where
  // source is .ts but the import path uses .js).
  const hasExt = SRC_EXTS.some((e) => target.endsWith(e));
  if (hasExt) {
    if (await exists(target)) return target;
    const swaps = { '.js': '.ts', '.jsx': '.tsx', '.ts': '.js', '.tsx': '.jsx' };
    for (const [from, to] of Object.entries(swaps)) {
      if (target.endsWith(from)) {
        const swapped = target.slice(0, -from.length) + to;
        if (await exists(swapped)) return swapped;
      }
    }
    return null;
  }
  // Try direct file w/ each ext
  for (const ext of SRC_EXTS) {
    const candidate = target + ext;
    if (await exists(candidate)) return candidate;
  }
  // Try index.*
  for (const ext of SRC_EXTS) {
    const candidate = join(target, 'index' + ext);
    if (await exists(candidate)) return candidate;
  }
  return null;
}

// ---------- import extraction ----------
// Matches: import ... from '...'; import '...'; export ... from '...'; import('...')
const IMPORT_RE = /(?:import|export)\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

function extractImports(source) {
  // Strip block + line comments to avoid false positives in JSDoc examples.
  const stripped = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1');
  const out = [];
  let m;
  while ((m = IMPORT_RE.exec(stripped)) !== null) {
    out.push(m[1] || m[2]);
  }
  return out;
}

// ---------- main ----------
async function main() {
  const elements = await loadElements();
  const aliases = await loadAliases();
  const files = await walk(srcRoot);

  // edges[`${from}->${to}`] = [{ from, to, importPath }]
  const edges = new Map();
  const unclassified = new Set();
  let importsScanned = 0;
  let importsResolved = 0;

  for (const file of files) {
    const relFrom = relative(repoRoot, file).split(sep).join(posix.sep);
    const fromType = classify(elements, relFrom);
    if (!fromType) {
      unclassified.add(relFrom);
      continue;
    }
    const src = await readFile(file, 'utf8');
    const specs = extractImports(src);
    for (const spec of specs) {
      importsScanned++;
      const resolved = await resolveImport(file, spec, aliases);
      if (!resolved) continue;
      const relTo = relative(repoRoot, resolved).split(sep).join(posix.sep);
      const toType = classify(elements, relTo);
      if (!toType) {
        unclassified.add(relTo);
        continue;
      }
      importsResolved++;
      const key = `${fromType}->${toType}`;
      if (!edges.has(key)) edges.set(key, []);
      edges.get(key).push({ from: relFrom, to: relTo, importPath: spec });
    }
  }

  // Sort each edge's file list for stable diffs
  const edgesObj = {};
  for (const [key, list] of [...edges.entries()].sort()) {
    list.sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
    edgesObj[key] = { count: list.length, files: list };
  }

  const out = {
    generatedAt: new Date().toISOString(),
    scannedFiles: files.length,
    importsScanned,
    importsResolved,
    edges: edgesObj,
    unclassified: [...unclassified].sort(),
  };
  await writeFile(outPath, JSON.stringify(out, null, 2));
  console.log(
    `Wrote ${relative(repoRoot, outPath)} · ${files.length} files · ` +
    `${importsResolved}/${importsScanned} imports classified · ` +
    `${Object.keys(edgesObj).length} edges`,
  );
  if (unclassified.size) {
    console.log(`  (${unclassified.size} unclassified paths — outside any element pattern)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
