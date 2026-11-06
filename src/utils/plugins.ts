import fs from 'fs';
import path from 'path';
import os from 'os';

const PLUGIN_DIR = path.join(os.homedir(), '.scaffzap', 'plugins');

export async function loadConverterPlugin() {
    if (!fs.existsSync(PLUGIN_DIR)) return [];

    const files = fs.readdirSync(PLUGIN_DIR).filter(f => f.endsWith('.js'));
    const plugins = [];
}