import { Component } from '@angular/core';
import {InputComponent} from "./components/input/input.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    InputComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Weather';
}
