export function jsonToMarkdown(data:any[]): string {
    if (!data || data.length === 0) return 'No data provided.';

    const headers = Object.keys(data[0]);
    const headerRow = `| ${headers.join(' | ')} |`;
}