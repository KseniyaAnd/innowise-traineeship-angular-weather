import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {WeatherApiService} from "../../services/weather-api.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {City} from "../../interfaces/city";
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {CityForecast} from "../../interfaces/city-forecast";

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
    private weatherApi = inject(WeatherApiService)

    loading = this.weatherApi.loading;

    protected searchText: string = '';
    protected lat: number = Number(localStorage.getItem("lat"));
    protected lon: number = Number(localStorage.getItem("lon"));
    protected cities = signal<City[]>([]);
    protected cityDayForecast: CityForecast | undefined;
    protected isDropdownVisible = signal(false)

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.searchText = params['search'] || '';
            console.log(params['search'])
        });

        console.log(this.searchText)

        this.weatherApi.getCity(this.lat, this.lon).subscribe(data => {
            this.weatherApi.selectedCity.next(data);
            this.cdr.markForCheck();
            console.log(data)
        })

    }

    protected updateFilters(search: string, tab: string = "") {
        this.router.navigate([], {
            queryParams: {
                search: search ? search : null,
                tab: tab ? tab : null,
            },
            queryParamsHandling: 'merge',
        });
    }

    protected onInput(): void {
        if (this.searchText) {
            this.weatherApi.getCites(this.searchText).subscribe(data => {
                this.cities.set(data);
            });
        }
    }

    protected clickCity(lat: number, lon: number, cityName: string): void {
        this.weatherApi.getCity(lat, lon).subscribe(data => {
            this.cityDayForecast = data;
            this.weatherApi.selectedCity.next(data);
            this.searchText = cityName;
            this.cdr.markForCheck();
            this.updateFilters(this.searchText, "one-day-forecast")
            localStorage.setItem("lat", String(lat));
            localStorage.setItem("lon", String(lon));
            console.log((this.searchText))
        });
    }

    protected showDropdown(): void {
        this.isDropdownVisible.set(true)
    }

    protected hideDropdown(): void {
        this.isDropdownVisible.set(false);
    }
}
