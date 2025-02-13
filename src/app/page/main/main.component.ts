import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {SearchComponent} from "../../components/input/search.component";
import {TableComponent} from "../../components/table/table.component";
import {City} from "../../interfaces/city";
import {CityForecast} from "../../interfaces/city-forecast";
import {WeatherApiService} from "../../services/weather-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
    standalone: true,
    imports: [
        SearchComponent,
        TableComponent
    ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export default class MainComponent {
    private weatherApi = inject(WeatherApiService);
    private router = inject(Router);

    protected cities = signal<City[]>([]);
    protected selectedCity = this.weatherApi.selectedCity;
    protected loading = this.weatherApi.loading;

    ngOnInit() {
        this.loadInitialCity();
    }

    private loadInitialCity() {
        const cityString = localStorage.getItem('curCity');
        if (cityString) {
            const cityForecast: CityForecast = JSON.parse(cityString);
            this.weatherApi.selectedCity.set(cityForecast);
            this.updateParamSearch(cityForecast.city.name);
        } else {
            this.weatherApi.selectedCity.set(null);
        }
    }

    protected getCities(searchText: string) {
        this.weatherApi.getCities(searchText).subscribe(data => {
            this.cities.set([...data]);
        });
        this.updateParamSearch(searchText)

    }

    protected getCity(city: City) {
        this.weatherApi.getCity(city.lat, city.lon).subscribe(data => {
            localStorage.setItem(`curCity`, JSON.stringify(data));

            this.weatherApi.selectedCity.set(data);
            this.updateParamSearch(data.city.name)
        });
    }

    protected updateParamSearch(search: string) {
        this.router.navigate([], {
            queryParams: {
                search: search ? search : null,
            },
            queryParamsHandling: 'merge',
        });
    }

}