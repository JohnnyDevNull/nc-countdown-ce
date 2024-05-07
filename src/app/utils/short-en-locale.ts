const formatDistanceLocale: any = {
  xSeconds: '{{count}}s',
  xMinutes: '{{count}}m',
  xHours: '{{count}}h',
  xDays: '{{count}} days',
  xMonths: '{{count}} mos',
  xYears: '{{count}} yr'
};
export const shortEnLocale = {
  formatDistance: (token: string, count: number) => formatDistanceLocale[token].replace('{{count}}', count)
};
