import { SimpleChange } from '@angular/core';
import { hasChange } from './has-change';

describe('hasChange', () => {
  it('should handle undefined',() => {
    expect(hasChange(undefined as any)).toBe(false);
  })

  it('should return false',() => {
    expect(hasChange({ previousValue: undefined, currentValue: 'a', firstChange: true } as SimpleChange)).toBe(false);
  })

  it('should return true', () => {
    expect(hasChange({ previousValue: 'b', currentValue: 'a', firstChange: true } as SimpleChange)).toBe(true);
  })
})
