import fs from 'fs';
import path from 'path';
import os from 'os';

const SCAFFZAP_DIR = path.join(os.homedir(), '.scaffzap', 'templates');

export function getCustomTemplates() {
  if (!fs.existsSync(SCAFFZAP_DIR)) return [];
  
  const dirs = fs.readdirSync(SCAFFZAP_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  return dirs.map(dir => ({
    title: `Custom: ${dir}`,
    value: `custom:${dir}`
  }));
}

function readDirRecursive(dir: string, baseDir: string, projectName: string): {path: string, content: string}[] {
  let results: {path: string, content: string}[] = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(readDirRecursive(fullPath, baseDir, projectName));
    } else {
      const relativePath = path.relative(baseDir, fullPath);
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
      
      results.push({ path: relativePath, content });
    }
  });
  
  return results;
}

export function loadCustomTemplate(templateName: string, projectName: string) {
  const templatePath = path.join(SCAFFZAP_DIR, templateName);
  if (!fs.existsSync(templatePath)) return [];
  return readDirRecursive(templatePath, templatePath, projectName);
}