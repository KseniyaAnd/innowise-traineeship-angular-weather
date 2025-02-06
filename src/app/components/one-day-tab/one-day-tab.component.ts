import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {WeatherApiService} from "../../services/weather-api.service";
import {CityForecast} from "../../interfaces/city-forecast";

@Component({
    selector: 'app-one-day-tab',
    imports: [],
    templateUrl: './one-day-tab.component.html',
    styleUrl: './one-day-tab.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class OneDayTabComponent implements OnInit {
    private weatherApi = inject(WeatherApiService)

    constructor(
        private cdr: ChangeDetectorRef
    ) {
    }

    protected selectedCitySubject = this.weatherApi.selectedCity;
    protected selectedCity: CityForecast | null | undefined;

    ngOnInit() {
        this.selectedCitySubject.subscribe(data => {
                this.selectedCity = data;
                this.cdr.markForCheck();
            }
        );
    }
}
