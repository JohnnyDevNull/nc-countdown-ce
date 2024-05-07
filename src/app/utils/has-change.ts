import { SimpleChange } from '@angular/core';

export function hasChange(change: SimpleChange) {
  return change?.previousValue != null && change.previousValue !== change.currentValue;
}
