import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

export function parseInputFile(filePath: string): any[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.json') {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [parsed];
  } 
  
  if (ext === '.yaml' || ext === '.yml') {
    const parsed = yaml.parse(content);
    return Array.isArray(parsed) ? parsed : [parsed];
  }

  if (ext === '.csv') {
    const lines = content.trim().split('\n');
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj: Record<string, any> = {};
      
      headers.forEach((header, i) => {
        let val: any = values[i] ? values[i].trim() : '';
        if (!isNaN(Number(val)) && val !== '') {
          val = Number(val);
        }
        if (val === 'true') val = true;
        if (val === 'false') val = false;
        
        obj[header] = val;
      });
      return obj;
    });
  }

  throw new Error(`Unsupported file extension: ${ext}. Please use .json, .csv, or .yaml`);
}
