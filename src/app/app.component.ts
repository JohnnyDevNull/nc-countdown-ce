import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router'
import { formatDuration } from 'date-fns/formatDuration';
import { intervalToDuration } from 'date-fns/intervalToDuration';
import { isBefore } from 'date-fns/isBefore';
import { parseISO } from 'date-fns/parseISO';
import fitty from 'fitty';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';

const formatDistanceLocale: any = {
  xSeconds: '{{count}}s',
  xMinutes: '{{count}}m',
  xHours: '{{count}}h',
  xDays: '{{count}} days',
  xMonths: '{{count}} mos',
  xYears: '{{count}} yr'
};
const shortEnLocale = { formatDistance: (token: string, count: number) => formatDistanceLocale[token].replace('{{count}}', count) }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private titleSubj = new BehaviorSubject<string>('');
  protected titleValue$ = this.titleSubj.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged(),
  );

  private dateValue$ = new BehaviorSubject<Date | null>(null);
  protected durationValue$ = this.dateValue$.asObservable().pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map((endDate) => {
      if (endDate == null) {
        return '';
      }

      const startDate = new Date();
      if (isBefore(endDate, startDate)) {
        return '';
      }

      const duration = intervalToDuration({ start: startDate, end:  endDate })
      return formatDuration(duration, { locale: shortEnLocale, zero: true });
    })
  );

  ngAfterViewInit(): void {
    fitty('.fit', { multiLine: false });
  }

  protected onDateChange(value: Event): void {
    const dateValue: string = (value.target as HTMLInputElement).value;

    try {
      const date = parseISO(dateValue);
      this.dateValue$.next(date);
    } catch(e) {
      this.dateValue$.next(null);
    }
  }

  protected onTitleChange(value: Event): void {
    this.titleSubj.next((value?.target as HTMLInputElement)?.value || '');
  }
}
