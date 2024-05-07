import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { CountdownDataComponent } from './components/countdown-data/countdown-data.component';
import { UserInputComponent } from './components/user-input/user-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserInputComponent, CountdownDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  titleValue = '';
  dateValue = '';
}
