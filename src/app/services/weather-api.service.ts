import {Injectable} from '@angular/core';
import {City} from "../interfaces/city";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {CityForecast} from "../interfaces/city-forecast";

@Injectable({
    providedIn: 'root'
})
export class WeatherApiService {
    private key: string = '325332aa70b4d6c50304beb810ad3cb4';

    public loading = new BehaviorSubject<boolean>(false);
    public firstTab = new BehaviorSubject<boolean>(true);
    public secondTab = new BehaviorSubject<boolean>(false);
    public selectedCity = new BehaviorSubject<CityForecast | null>(null);

    constructor(private http: HttpClient) {
    }

    getCites(str: string): Observable<City[]> {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${str}&limit=10&appid=${this.key}`;
        this.loading.next(true);
        return this.http.get<City[]>(url).pipe(
            tap(() => this.loading.next(false))
        )
    }

    getCity(lat: number, lon: number): Observable<CityForecast> {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.key}&cnt=8`;
        return this.http.get<CityForecast>(url)
    }

}
