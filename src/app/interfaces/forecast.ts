export interface Forecast {
    clouds: {
        all: number
    },
    dt: number,
    dt_txt: string,
    main: {
        feels_like: number
        grnd_level: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
        temp_kf: number
        temp_max: number
        temp_min: number
    },
    pop: number,
    sys: {},
    visibility: {}
    weather: [{
        description: string,
        icon: string,
        id: number,
        main: string
    }]
    wind: {}
}
