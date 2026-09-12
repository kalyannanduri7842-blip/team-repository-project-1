import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPhoneNumber,
  getInitials,
  formatNumber,
  formatPercent,
  getScoreColor,
} from '../../utils/formatters';

describe('formatters utility', () => {
  describe('formatCurrency', () => {
    it('formats standard integer numbers into USD currency format', () => {
      expect(formatCurrency(12500)).toBe('$12,500');
      expect(formatCurrency(0)).toBe('$0');
      expect(formatCurrency(1000000)).toBe('$1,000,000');
    });

    it('handles negative amounts correctly', () => {
      expect(formatCurrency(-500)).toBe('-$500');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with thousand comma separators', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(500)).toBe('500');
    });
  });

  describe('formatPercent', () => {
    it('formats percentage values with symbol', () => {
      expect(formatPercent(24.5)).toBe('24.5%');
      expect(formatPercent(100)).toBe('100.0%');
    });
  });

  describe('formatDate and formatDateTime', () => {
    it('formats ISO date strings properly', () => {
      const formatted = formatDate('2026-03-15T10:30:00Z');
      expect(formatted).toContain('Mar');
      expect(formatted).toContain('2026');
    });

    it('returns fallback string for invalid date inputs', () => {
      expect(formatDate('')).toBe('—');
      expect(formatDate('invalid-date')).toBe('—');
    });
  });

  describe('formatPhoneNumber', () => {
    it('formats 10 digit US phone numbers', () => {
      expect(formatPhoneNumber('4155552671')).toBe('(415) 555-2671');
    });

    it('formats with leading +1 country code', () => {
      expect(formatPhoneNumber('+14155552671')).toBe('+1 (415) 555-2671');
    });

    it('returns raw string if not matching 10-digit pattern', () => {
      expect(formatPhoneNumber('12345')).toBe('12345');
    });
  });

  describe('getInitials', () => {
    it('extracts two letter initials from full name', () => {
      expect(getInitials('Sarah Jenkins')).toBe('SJ');
      expect(getInitials('Michael Chang')).toBe('MC');
    });

    it('extracts single initial if only one name word provided', () => {
      expect(getInitials('Nexora')).toBe('N');
    });

    it('handles empty or whitespace inputs gracefully', () => {
      expect(getInitials('')).toBe('—');
    });
  });

  describe('getScoreColor', () => {
    it('returns emerald colors for high scores >= 80', () => {
      expect(getScoreColor(85)).toContain('emerald');
    });

    it('returns peach colors for moderate scores between 60 and 79', () => {
      expect(getScoreColor(70)).toContain('peach');
    });

    it('returns amber colors for scores between 40 and 59', () => {
      expect(getScoreColor(50)).toContain('amber');
    });

    it('returns rose colors for low scores below 40', () => {
      expect(getScoreColor(25)).toContain('rose');
    });
  });
});
