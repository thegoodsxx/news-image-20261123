import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const srcUrl = new URL('./entry.png', import.meta.url);
const destPath = join(outDir, 'entry.png');

copyFileSync(srcUrl, destPath);

const srcStats = statSync(srcUrl);
const destStats = statSync(destPath);
if (destStats.size !== srcStats.size) {
  throw new Error(`Copied output size mismatch: expected ${srcStats.size} bytes, got ${destStats.size} bytes`);
}

