import fs from 'fs';
import path from 'path';

export interface ScaffzapConfig {
    defaultPackageManager: 'npm' | 'yarn' | 'pnpm' | 'skip';
    ci?: boolean;
    defaultTemplate?: string;
    gitInit?: boolean;
}