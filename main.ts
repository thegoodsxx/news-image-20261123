// news-image-20261123: Monday 23 November 2026
// Sums up 23 November 2026 world news in a broadsheet front page image by copying entry.png to the target output directory.

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const srcUrl = new URL('./entry.png', import.meta.url);
if (!existsSync(srcUrl)) {
  throw new Error(`Source poster not found: ${srcUrl.pathname}`);
}

const destPath = join(outDir, 'entry.png');
copyFileSync(srcUrl, destPath);

const srcStats = statSync(srcUrl);
const destStats = statSync(destPath);
if (destStats.size !== srcStats.size) {
  throw new Error(`Copied output size mismatch: expected ${srcStats.size} bytes, got ${destStats.size} bytes`);
}


