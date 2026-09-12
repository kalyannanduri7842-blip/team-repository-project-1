/**
 * Browser-native print-to-PDF utility for CRM reports and deal summaries.
 */

export function triggerPrintReport(title: string = 'NEXORA CRM Report'): void {
  const originalTitle = document.title;
  document.title = title;

  try {
    window.print();
  } finally {
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }
}
