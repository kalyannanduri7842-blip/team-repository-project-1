import { describe, it, expect, vi } from 'vitest';
import { triggerPrintReport } from '../../utils/exportPdf';

describe('exportPdf utility', () => {
  it('calls window.print when triggered', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    triggerPrintReport('Test Report');
    expect(printSpy).toHaveBeenCalled();
    printSpy.mockRestore();
  });
});
