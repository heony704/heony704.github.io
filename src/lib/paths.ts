export function getBasePath() {
  const raw = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return raw && raw !== '/' ? `/${raw.replace(/^\/|\/$/g, '')}` : '';
}

export function withBasePath(path: string) {
  const basePath = getBasePath();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}` || '/';
}

export function postPath(slug: string) {
  return withBasePath(`/${slug}/`);
}
