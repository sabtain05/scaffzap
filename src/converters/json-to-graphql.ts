export function jsonToGraphql(data: any[], typeName = 'GeneratedType'): string {
  if (!data || data.length === 0) return `type ${typeName} {}\n`;

  const firstItem = data[0];
  let fields = '';

  for (const key in firstItem) {
    const val = firstItem[key];
    let type = typeof val;
    let gqlType = 'String';

    if (type === 'number') {
      gqlType = Number.isInteger(val) ? 'Int' : 'Float';
    } else if (type === 'boolean') {
      gqlType = 'Boolean';
    } else if (Array.isArray(val)) {
      gqlType = '[String]';
    }

    fields += `  ${key}: ${gqlType}\n`;
  }

  return `type ${typeName} {\n${fields}}\n`;
}