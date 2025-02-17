export interface CityForecastRefact {
    cityName: string
    weather: {
        clouds: number
        dayTime: string
        day: string
        feelsLike: number
        pressure: number
        temp: number
        pop: number
        icon: string
    }[]
}
