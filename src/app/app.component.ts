import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { formatDuration } from 'date-fns/formatDuration';
import { intervalToDuration } from 'date-fns/intervalToDuration';
import { isBefore } from 'date-fns/isBefore';
import { CountdownDataComponent } from './components/countdown-data/countdown-data.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { LocalStorageService } from './services/local-storage.service';
import { shortEnLocale } from './utils/short-en-locale';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserInputComponent, CountdownDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  titleValue = '';
  durationValue = '';

  private readonly storageService = inject(LocalStorageService);

  ngOnInit() {
    const data = this.storageService.get();
    if (data) {
      this.titleValue = data.title as string;
      if (data.date) {
        this.durationValue = this.toDuration(new Date(data.date));
      }
    }
  }

  onTitleChange(value: string) {
    this.titleValue = value;
    this.storageService.save({ title: value });
  }

  onDateChange(value: Date | null) {
    this.durationValue = this.toDuration(value)
    this.storageService.save({ date: value?.toISOString() });
  }

  toDuration(endDate: Date | null): string {
    if (endDate == null) {
      return '';
    }

    const startDate = new Date();
    if (isBefore(endDate, startDate)) {
      return '';
    }

    const duration = intervalToDuration({ start: startDate, end:  endDate })
    return formatDuration(duration, { locale: shortEnLocale, zero: true });
  }
}
