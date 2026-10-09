export function jsonToSql(data: any[], tableName = 'my_table'): string {
  if (!data || data.length === 0) return '-- No data provided.';

  const columns = Object.keys(data[0]);
  const columnString = columns.join(', ');

  const insertStatements = data.map(row => {
    const values = columns.map(col => {
      const val = row[col];
      return typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : val;
    }).join(', ');

    return `INSERT INTO ${tableName} (${columnString}) VALUES (${values});`;
  }).join('\n');

  return insertStatements;
}