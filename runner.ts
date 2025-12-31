#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const [, , day, which] = process.argv;
  if (!day || !which) {
    console.log('Usage: node ./runner.ts <day> <input|example>');
    try {
      const entries = await fs.readdir(path.resolve(__dirname, '.'));
      const days = entries.filter(e => /^\d{2}$/.test(e)).sort();
      if (days.length) console.log('Available days:', days.join(' '));
    } catch {}
    process.exit(1);
  }

  const dayDir = path.resolve(__dirname, day);
  try {
    const stat = await fs.stat(dayDir);
    if (!stat.isDirectory()) throw new Error();
  } catch {
    console.error(`Day folder not found: ${day}`);
    process.exit(1);
  }

  const fileName = which === 'input' ? 'input.txt' : which === 'example' ? 'example.txt' : `${which}.txt`;
  const inputPath = path.join(dayDir, fileName);
  let input: string;
  try {
    input = await fs.readFile(inputPath, 'utf8');
  } catch (err) {
    console.error(`Could not read input file: ${inputPath}`);
    process.exit(1);
  }

  const solverPath = path.join(dayDir, 'solver.ts');
  try {
    const mod = await import(pathToFileURL(solverPath).href);
    const fn = mod.default ?? mod.solve ?? mod.run;
    if (typeof fn !== 'function') {
      console.error(`No default export or named 'solve'/'run' function found in ${solverPath}`);
      process.exit(1);
    }

    const res = await fn(input);
    if (res === undefined) return;

    if (typeof res === 'object') {
      console.log(JSON.stringify(res, null, 2));
    } else {
      console.log(res);
    }
  } catch (err) {
    console.error('Error running solver:', err);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});