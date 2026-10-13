export function jsonToTsInterface(data: any[], interfaceName = 'GeneratedInterface'): string {
  if (!data || data.length === 0) return `export interface ${interfaceName} {}\n`;

  const firstItem = data[0];
  let interfaceBody = '';

  for (const key in firstItem) {
    let type: string = typeof firstItem[key];
    
    if (firstItem[key] === null) {
      type = 'any';
    } else if (Array.isArray(firstItem[key])) {
      type = 'any[]';
    } else if (type === 'object') {
      type = 'Record<string, any>';
    }

    interfaceBody += `  ${key}: ${type};\n`;
  }

  return `export interface ${interfaceName} {\n${interfaceBody}}\n`;
}