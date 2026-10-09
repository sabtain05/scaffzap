export function jsonToMarkdown(data:any[]): string {
    if (!data || data.length === 0) return 'No data provided.';

    const headers = Object.keys(data[0]);
    const headerRow = `| ${headers.join(' | ')} |`;
    const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
    const dataRows = data.map(row => {
        return `| ${headers.map(header => row[header] || '').join(' | ')} |`;
    }).join('\n');

    return `${headerRow}\n${separatorRow}\n${dataRows}\n`;
}