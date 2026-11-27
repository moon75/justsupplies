import fs from "node:fs";
import path from "node:path";

/**
 * File-based data store. All site content lives as JSON in DATA_DIR (default: src/data),
 * so the site + control panel run on any Node.js server with no external database.
 */
export const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(process.cwd(), "src", "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const cache = new Map<string, { mtime: number; data: unknown }>();

export function readData<T>(name: string, fallback: T): T {
  const file = path.join(DATA_DIR, `${name}.json`);
  let mtime: number;
  try { mtime = fs.statSync(file).mtimeMs; } catch { return fallback; }
  const hit = cache.get(name);
  if (hit && hit.mtime === mtime) return hit.data as T;
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as T;
  cache.set(name, { mtime, data });
  return data;
}

export function writeData(name: string, data: unknown) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${name}.json`);
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data));
  fs.renameSync(tmp, file); // atomic replace
  cache.delete(name);
}
