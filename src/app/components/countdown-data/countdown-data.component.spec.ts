import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownDataComponent } from './countdown-data.component';

describe('CountdownDataComponent', () => {
  let component: CountdownDataComponent;
  let fixture: ComponentFixture<CountdownDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountdownDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountdownDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(CountdownDataComponent);
  });
});
