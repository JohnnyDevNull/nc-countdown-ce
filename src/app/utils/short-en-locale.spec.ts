import { shortEnLocale } from './short-en-locale';

describe('shortEnLocale', () => {
  it('should return the locale string for seconds', () => {
    expect(shortEnLocale.formatDistance('xSeconds', 42)).toBe('42s');
  })

  it('should return the locale string for minutes', () => {
    expect(shortEnLocale.formatDistance('xMinutes', 42)).toBe('42m');
  })

  it('should return the locale string for hours', () => {
    expect(shortEnLocale.formatDistance('xHours', 42)).toBe('42h');
  })

  it('should return the locale string for hours', () => {
    expect(shortEnLocale.formatDistance('xDays', 42)).toBe('42 days');
  })

  it('should return the locale string for months', () => {
    expect(shortEnLocale.formatDistance('xMonths', 42)).toBe('42 mos');
  })

  it('should return the locale string for years', () => {
    expect(shortEnLocale.formatDistance('xYears', 42)).toBe('42 yr');
  })
})
