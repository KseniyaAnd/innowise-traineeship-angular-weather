import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {InputComponent} from "./components/input/input.component";
import {TableComponent} from "./components/table/table.component";
import {CityForecast} from "./interfaces/city-forecast";
import {WeatherApiService} from "./services/weather-api.service";
import {City} from "./interfaces/city";


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

  protected cities = signal<City[]>([]);
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

  protected getCities (searchText: string) {
      this.weatherApi.getCities(searchText).subscribe(data => {
        this.cities.set(data);
//задержка
        console.log(data)
      });
  }

  protected getCity (city: City) {
    this.weatherApi.getCity(city.lat, city.lon).subscribe(data => {
      localStorage.setItem(`curCity`, JSON.stringify(data));

      this.weatherApi.selectedCity.next(data);
      // this.searchText = cityName;
      //this.updateFilters(this.searchText, "one-day-forecast")
    });
  }

  title = 'Weather';
}
