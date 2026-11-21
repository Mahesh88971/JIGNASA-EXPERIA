export function publicUrl(path: string): string {
  if (/^(?:https?:\/\/|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const relativePath = path.replace(/^\//, '');
  return `${base}/${relativePath}`;
}
