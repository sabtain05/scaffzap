import fs from 'fs';
import path from 'path';

export interface ScaffzapConfig {
    defaultPackageManager: 'npm' | 'yarn' | 'pnpm' | 'skip';
    ci?: boolean;
    defaultTemplate?: string;
    gitInit?: boolean;
}

export function loadWorkspaceConfig(): ScaffzapConfig {
    const configPath = path.join(process.cwd(), 'scaffzap.json');

    if (fs.existsSync(configPath)) {
        try {
            const configData = fs.readFileSync(configPath, 'utf8');
        }
    }
}