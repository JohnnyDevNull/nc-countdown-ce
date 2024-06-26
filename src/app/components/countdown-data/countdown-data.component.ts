import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import fitty from 'fitty';
import { hasChange } from '../../utils/has-change';

@Component({
  selector: 'app-countdown-data',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countdown-data.component.html',
  styleUrls: ['./countdown-data.component.scss']
})
export class CountdownDataComponent implements AfterViewInit, OnChanges {
  @Input() titleValue = '';
  @Input() durationValue = '';

  ngAfterViewInit(): void {
    this.callFitty()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (hasChange(changes['dateValue']) || hasChange(changes['titleValue'])) {
      this.callFitty()
    }
  }

  private callFitty() {
    setTimeout(() => fitty('.fit', { multiLine: false }), 150);
  }
}
