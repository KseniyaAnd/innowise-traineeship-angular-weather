import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {SearchComponent} from "../../components/input/search.component";
import {TableComponent} from "../../components/table/table.component";
import {City} from "../../interfaces/city";
import {WeatherApiService} from "../../services/weather-api.service";
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";
import {TabsComponent} from "../../components/tabs/tabs.component";
import {Tabs} from "../../const/tabs";
import {SearchOption} from "../../interfaces/search-option";
import {map, Observable, tap} from "rxjs";
import {CityForecastRefact} from "../../interfaces/city-forecast-refact";

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        SearchComponent,
        TableComponent,
        TabsComponent
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export default class MainComponent implements OnInit {
    private weatherApi = inject(WeatherApiService);
    private localStorageService = inject(LocalStorageService)
    private router = inject(Router);

    protected cities = signal<SearchOption[]>([]);
    protected tab = signal<Tabs>(Tabs.OneDay)
    protected selectedCity = this.weatherApi.selectedCity;
    protected loading = this.weatherApi.loading;

    ngOnInit() {
        this.loadInitialCity();
    }

    private loadInitialCity() {
        const cityForecast = this.localStorageService.getData('curCity');
        console.log(cityForecast)
        this.weatherApi.selectedCity.set(cityForecast);
        this.updateParamSearch(cityForecast.cityName);
    }

    protected getCities(searchText: string): Observable<SearchOption[]> {
        return this.weatherApi.getCities(searchText).pipe(
            map(data => {
                const cities = data.map(el => ({
                    id: `${el.lon} ${el.lat}`,
                    name: el.name
                }));
                this.cities.set(cities);
                return cities;
            }),
            tap(() => {
                this.updateParamSearch(searchText);
            })
        );
    }

    protected getCity(city: SearchOption) {
        const [lon, lat] = city.id.split(' ').map(Number);

        this.weatherApi.getCity(lat, lon).subscribe(data => {
            this.localStorageService.saveData(`curCity`, data.toString());

            this.weatherApi.selectedCity.set(data);
            this.updateParamSearch(data.cityName);
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

    setTab(tab: Tabs) {
        this.tab.set(tab);
    }
}