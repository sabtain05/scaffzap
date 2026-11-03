import fs from 'fs';
import path from 'path';

export interface ScaffzapConfig {
  defaultPackageManager?: 'npm' | 'yarn' | 'pnpm' | 'skip';
  ci?: boolean;
  defaultTemplate?: string;
  gitInit?: boolean;
}

export function loadWorkspaceConfig(): ScaffzapConfig {
  const configPath = path.join(process.cwd(), 'scaffzap.json');
  
  if (fs.existsSync(configPath)) {
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(configData) as ScaffzapConfig;
    } catch (error) {
      console.warn('Found scaffzap.json but failed to parse it. Ignoring config.');
    }
  }
  
  return {};
}