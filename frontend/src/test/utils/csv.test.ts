import { describe, it, expect, vi } from 'vitest';
import { exportToCSV } from '../../utils/csv';

describe('CSV export utility', () => {
  it('handles empty data arrays without crashing', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    exportToCSV([], 'test.csv');
    alertMock.mockRestore();
  });

  it('correctly creates a downloadable blob and triggers anchor click', () => {
    const sampleData = [
      { id: '1', name: 'John Doe', email: 'john@example.com', amount: 5000 },
      { id: '2', name: 'Jane Smith, VP', email: 'jane@example.com', amount: 12000 },
    ];

    const clickMock = vi.fn();
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: vi.fn(),
      click: clickMock,
      style: {},
    } as any);

    const appendChildSpy = vi.spyOn(document.body, 'appendChild').mockImplementation(() => null as any);
    const removeChildSpy = vi.spyOn(document.body, 'removeChild').mockImplementation(() => null as any);

    exportToCSV(sampleData, 'contacts.csv');

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickMock).toHaveBeenCalled();

    createElementSpy.mockRestore();
    appendChildSpy.mockRestore();
    removeChildSpy.mockRestore();
  });
});
