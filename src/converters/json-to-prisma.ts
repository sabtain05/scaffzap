export function jsonToPrisma(data: any[], modelName = 'GeneratedModel'): string {
  if (!data || data.length === 0) return `model ${modelName} {}\n`;

  const firstItem = data[0];
  let fields = '';

  for (const key in firstItem) {
    const val = firstItem[key];
    let type = typeof val;
    let prismaType = 'String';

    if (type === 'number') {
      prismaType = Number.isInteger(val) ? 'Int' : 'Float';
    } else if (type === 'boolean') {
      prismaType = 'Boolean';
    }

    let modifiers = '';
    if (key.toLowerCase() === 'id') {
      modifiers = prismaType === 'Int' ? ' @id @default(autoincrement())' : ' @id @default(uuid())';
    }

    fields += `  ${key} ${prismaType}${modifiers}\n`;
  }

  return `model ${modelName} {\n${fields}}\n`;
}