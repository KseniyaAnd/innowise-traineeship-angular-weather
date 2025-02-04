import {Injectable} from '@angular/core';
import {City} from "../interfaces/city";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WeatherApiService {
    private key: string = '325332aa70b4d6c50304beb810ad3cb4';

    constructor(private http: HttpClient) {
    }

    getCites(str: string): Observable<City[]> {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${str}&limit=10&appid=${this.key}`;
        return this.http.get<City[]>(url)
    }

    getCity(lat: number, lon: number): Observable<City> {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.key}&cnt=1`;
        return this.http.get<City>(url)
    }

}
