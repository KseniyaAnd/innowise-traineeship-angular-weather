import {Injectable, signal} from '@angular/core';
import {City} from "../interfaces/city";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {CityForecast} from "../interfaces/city-forecast";
import {environment} from "../../environments/environment.development";
import {Forecast} from "../interfaces/forecast";
import {CityForecastRefact} from "../interfaces/city-forecast-refact";
import {transformDateToMonth} from "../utils/utils";

@Injectable({
    providedIn: 'root'
})
export class WeatherApiService {
    private key: string = environment.weatherApiKey;
    private baseUrl: string = environment.weatherApiUrl;

    public loading = signal(false);
    public selectedCity = signal<CityForecastRefact | null>(null);

    // signal, computed, effect

    constructor(
        private http: HttpClient,
    ) {
    }

    getCities(str: string): Observable<City[]> {
        const url = `${this.baseUrl}/geo/1.0/direct?q=${str}&limit=10&appid=${this.key}`;
        this.loading.set(true);
        return this.http.get<City[]>(url).pipe(
            tap(() => this.loading.set(false))
        )
    }

    getCity(lat: number, lon: number): Observable<CityForecastRefact> {
        const url = `${this.baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.key}&cnt=40`;
        return this.http.get<CityForecast>(url).pipe(
            map(el => {
                return {
                    cityName: el.city.name,
                    weather: el.list.map(el => {
                        return {
                            clouds: el.clouds.all,
                            dayTime: (el.dt_txt).slice(11, 16),
                            day: transformDateToMonth(el.dt_txt),
                            feelsLike: el.main.feels_like,
                            pressure: el.main.pressure,
                            temp: el.main.temp,
                            pop: el.pop,
                            icon: el.weather[0].icon,
                        }
                    })
                }
            })
        )
    }
}
