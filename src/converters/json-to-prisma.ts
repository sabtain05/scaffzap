export function jsonToPrisma(data: any[], modelName = 'GeneratedModel'): string {
  if (!data || data.length === 0) return `model ${modelName} {}\n`;

  const firstItem = data[0];
  let fields = '';
  let relatedModels = '';

  for (const key in firstItem) {
    const val = firstItem[key];

    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      const relationName = key.charAt(0).toUpperCase() + key.slice(1);
      fields += `  ${key}Id Int\n`;
      fields += `  ${key} ${relationName} @relation(fields: [${key}Id], references: [id])\n`;
      relatedModels += `\n${jsonToPrisma([val], relationName)}`;
      continue;
    }

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

  return `model ${modelName} {\n${fields}}\n${relatedModels}`;
}