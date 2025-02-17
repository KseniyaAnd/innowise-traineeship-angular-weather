import {Forecast} from "./forecast";

export interface CityForecast {
    city: {
        coord: {}
        country: string
        id: number
        name: string
        population: number
        sunrise: number
        sunset: number
        timezone: number
    },
    cnt: number,
    cod: string,
    list: Forecast[]
}

