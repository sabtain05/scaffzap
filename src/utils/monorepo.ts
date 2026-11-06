import fs from 'fs';
import path from 'path';

export function detectMonorepo(cwd: string = process.cwd()): string | null {
  if (fs.existsSync(path.join(cwd, 'turbo.json'))) return 'Turborepo';
  if (fs.existsSync(path.join(cwd, 'nx.json'))) return 'Nx';
  if (fs.existsSync(path.join(cwd, 'lerna.json'))) return 'Lerna';
  if (fs.existsSync(path.join(cwd, 'pnpm-workspace.yaml'))) return 'pnpm-workspace';
  return null;
}