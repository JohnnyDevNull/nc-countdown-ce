import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import fitty from 'fitty';

@Component({
  selector: 'app-countdown-data',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countdown-data.component.html',
  styleUrls: ['./countdown-data.component.scss']
})
export class CountdownDataComponent implements AfterViewInit {
  @Input() titleValue = '';
  @Input() dateValue = '';

  ngAfterViewInit(): void {
    fitty('.fit', { multiLine: false });
  }
}
