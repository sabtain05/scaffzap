import fs from 'fs';
import path from 'path';
import os from 'os';

const PLUGINS_DIR = path.join(os.homedir(), '.scaffzap', 'plugins');

export async function loadConverterPlugin() {
    if (!fs.existsSync(PLUGINS_DIR)) return [];

    const files = fs.readdirSync(PLUGINS_DIR).filter(f => f.endsWith('.js'));
    const plugins = [];

    for (const file of files) {
        const pluginPath = path.join(PLUGINS_DIR, file);
        const plugin = await import(`files://${pluginPath}`);
        if (plugin.name && plugin.handler && plugin.extension) {
            plugins.push({
                title: `Plugin: ${plugin.name}`,
                value: `plugin:${file}`,
                handler: plugin.handler,
                extension: plugin.extension
            });
        }
    }
    return plugins;
}