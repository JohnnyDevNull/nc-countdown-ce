import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { formatDuration } from 'date-fns/formatDuration';
import { intervalToDuration } from 'date-fns/intervalToDuration';
import { isBefore } from 'date-fns/isBefore';
import { parseISO } from 'date-fns/parseISO';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { shortEnLocale } from '../../utils/short-en-locale';

@Component({
  selector: 'app-user-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit, OnDestroy {
  @Output() titleChange = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<string>();

  private titleSubj = new BehaviorSubject<string>('');
  private dateValue$ = new BehaviorSubject<Date | null>(null);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {

    this.titleSubj.asObservable()
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(titleValue => this.titleChange.emit(titleValue));

    this.dateValue$.asObservable().pipe(
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
      }),
      takeUntil(this.destroy$)
    ).subscribe(dateValue => this.dateChange.emit(dateValue))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
