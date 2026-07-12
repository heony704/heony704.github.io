import fs from 'fs';
import path from 'path';

const root = process.cwd();
const contentDir = path.join(root, 'content');
const publicDir = path.join(root, 'public');
const postAssetsDir = path.join(publicDir, 'posts-assets');
const staticDir = path.join(root, 'static');
const assetsDir = path.join(root, 'assets');

const copiedExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg']);

function assertInsideRoot(targetPath) {
  const relative = path.relative(root, targetPath);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Refusing to touch a path outside the project: ${targetPath}`);
  }
}

function copyFileIfExists(from, to) {
  if (!fs.existsSync(from)) {
    return;
  }

  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

function copyDirectoryFiles(fromDir, toDir) {
  if (!fs.existsSync(fromDir)) {
    return;
  }

  for (const entry of fs.readdirSync(fromDir, { withFileTypes: true })) {
    const from = path.join(fromDir, entry.name);
    const to = path.join(toDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryFiles(from, to);
    } else {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
    }
  }
}

assertInsideRoot(publicDir);
fs.rmSync(publicDir, { recursive: true, force: true });
fs.mkdirSync(publicDir, { recursive: true });
copyDirectoryFiles(staticDir, publicDir);
copyFileIfExists(path.join(assetsDir, 'blog.png'), path.join(publicDir, 'banner.png'));
copyFileIfExists(path.join(assetsDir, 'sample.png'), path.join(publicDir, 'sample.png'));

if (fs.existsSync(contentDir)) {
  for (const entry of fs.readdirSync(contentDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const slug = entry.name;
    const sourceDir = path.join(contentDir, slug);
    const targetDir = path.join(postAssetsDir, slug);

    for (const file of fs.readdirSync(sourceDir, { withFileTypes: true })) {
      if (!file.isFile() || file.name === 'index.md') {
        continue;
      }

      if (!copiedExtensions.has(path.extname(file.name).toLowerCase())) {
        continue;
      }

      copyFileIfExists(path.join(sourceDir, file.name), path.join(targetDir, file.name));
    }
  }
}
