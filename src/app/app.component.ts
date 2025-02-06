import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {InputComponent} from "./components/input/input.component";
import {TableComponent} from "./components/table/table.component";
import {CityForecast} from "./interfaces/city-forecast";
import {WeatherApiService} from "./services/weather-api.service";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    InputComponent,
    TableComponent
  ],
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit{
  private weatherApi = inject(WeatherApiService);

  protected selectedCitySubject = this.weatherApi.selectedCity;
  protected selectedCity: CityForecast | null | undefined;

  constructor(
      private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.selectedCitySubject.subscribe(data => {
          this.selectedCity = data;
          this.cdr.markForCheck();
        }
    );
  }

  title = 'Weather';
}
