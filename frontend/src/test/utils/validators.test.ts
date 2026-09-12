import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidCurrency,
  calculatePasswordStrength,
} from '../../utils/validators';

describe('validators utility', () => {
  it('validates standard email formats correctly', () => {
    expect(isValidEmail('admin@nexora.io')).toBe(true);
    expect(isValidEmail('sarah.chen+test@domain.co.uk')).toBe(true);
    expect(isValidEmail('plainaddress')).toBe(false);
    expect(isValidEmail('@missingusername.com')).toBe(false);
  });

  it('validates phone numbers with digits count', () => {
    expect(isValidPhone('(415) 555-0199')).toBe(true);
    expect(isValidPhone('4155550199')).toBe(true);
    expect(isValidPhone('123')).toBe(false);
  });

  it('validates URLs with http/https protocols', () => {
    expect(isValidUrl('https://nexora.io')).toBe(true);
    expect(isValidUrl('http://localhost:5173')).toBe(true);
    expect(isValidUrl('invalid-url')).toBe(false);
  });

  it('validates non-negative numeric currency amounts', () => {
    expect(isValidCurrency(5000)).toBe(true);
    expect(isValidCurrency(0)).toBe(true);
    expect(isValidCurrency(-100)).toBe(false);
  });

  it('calculates password complexity accurately', () => {
    const weak = calculatePasswordStrength('pass');
    expect(weak.label).toBe('Weak');

    const strong = calculatePasswordStrength('P@ssw0rd2026!');
    expect(strong.score).toBe(100);
    expect(strong.label).toBe('Very Strong');
    expect(strong.hasUppercase).toBe(true);
    expect(strong.hasSpecial).toBe(true);
  });
});
