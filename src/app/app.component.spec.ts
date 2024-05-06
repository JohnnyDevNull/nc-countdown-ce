import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [AppComponent]}).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  })

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeInstanceOf(AppComponent);
  })
})
