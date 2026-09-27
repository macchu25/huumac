import { readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import { routes } from './dist/guests.js';

// Clean legacy macnhuhuu
await rm(new URL('./dist/macnhuhuu', import.meta.url), { recursive: true, force: true });

const html = await readFile(new URL('./dist/index.html', import.meta.url), 'utf8');

for (const slug of Object.keys(routes)) {
  if (!slug) continue;
  const dir = new URL(`./dist/${slug}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), html);
}

console.log('Built personalized routes: ngocmai, nhanoi, nhangoai, vanhoa and root.');


