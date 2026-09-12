/**
 * In-browser CSV Export & Import utilities.
 * Handles escaping, comma/quote handling, file generation and download triggering, and CSV string parsing.
 */

export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; header: string }[]
): void {
  if (!data || data.length === 0) {
    console.warn('No data to export to CSV.');
    return;
  }

  const cols = columns || Object.keys(data[0]).map((k) => ({ key: k as keyof T, header: k }));

  const headers = cols.map((col) => `"${col.header.replace(/"/g, '""')}"`).join(',');

  const rows = data.map((item) =>
    cols
      .map((col) => {
        const val = item[col.key];
        if (val === null || val === undefined) return '""';
        if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
        const strVal = String(val).replace(/"/g, '""');
        return `"${strVal}"`;
      })
      .join(',')
  );

  const csvContent = [headers, ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename.endsWith('.csv') ? filename : `${filename}.csv`}`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface CSVParseResult<T = Record<string, string>> {
  headers: string[];
  data: T[];
  errors: string[];
}

export function parseCSV(csvText: string): CSVParseResult {
  const lines = csvText.split(/\r\n|\n|\r/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    return { headers: [], data: [], errors: ['CSV file is empty.'] };
  }

  function parseRow(text: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++; // skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  const rawHeaders = parseRow(lines[0]);
  const headers = rawHeaders.map((h) => h.replace(/^["']|["']$/g, '').trim());
  const data: Record<string, string>[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawCols = parseRow(lines[i]);
    if (rawCols.length !== headers.length) {
      errors.push(`Row ${i + 1} has ${rawCols.length} columns, expected ${headers.length}`);
      continue;
    }

    const rowObj: Record<string, string> = {};
    headers.forEach((header, idx) => {
      rowObj[header] = rawCols[idx] ? rawCols[idx].replace(/^["']|["']$/g, '').trim() : '';
    });
    data.push(rowObj);
  }

  return { headers, data, errors };
}
