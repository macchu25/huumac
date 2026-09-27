import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.json': 'application/json',
  '.glb': 'model/gltf-binary'
};

http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean === '/macnhuhuu') {
      res.writeHead(301, { 'Location': '/', 'Cache-Control': 'no-store' });
      return res.end();
    }
    const validRoutes = new Set(['/', '/index.html', '/ngocmai', '/nhanoi', '/nhangoai', '/vanhoa']);
    const isRoute = validRoutes.has(clean);
    const file = path.resolve(root, isRoute ? 'index.html' : '.' + pathname);
    if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': (mime[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    res.end(data);
  } catch {
    try {
      const data = await readFile(path.resolve(root, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  }
}).listen(4173, '127.0.0.1', () => console.log('http://127.0.0.1:4173'));


