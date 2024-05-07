import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { parseISO } from 'date-fns/parseISO';
import { BehaviorSubject, debounceTime, distinctUntilChanged, skip, Subject, takeUntil } from 'rxjs';

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
  @Output() dateChange = new EventEmitter<Date | null>();

  private titleSubj = new BehaviorSubject<string>('');
  private dateValue$ = new BehaviorSubject<Date | null>(null);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {

    this.titleSubj.asObservable()
      .pipe(
        skip(1),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(titleValue => this.titleChange.emit(titleValue));

    this.dateValue$.asObservable().pipe(
      skip(1),
      debounceTime(300),
      distinctUntilChanged(),
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
