import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject, Input,
    OnInit,
    Output,
    signal
} from '@angular/core';
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

    @Output() onInputEvent = new EventEmitter<string>();
    @Output() onClickEvent = new EventEmitter<City>();
    @Input() items: City[] = []

    loading = this.weatherApi.loading;

    // smart dumb components
    //

    protected searchText: string = '';
    // protected lat: number = Number(localStorage.getItem("lat"));
    // protected lon: number = Number(localStorage.getItem("lon"));
    protected isDropdownVisible = signal(false);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.searchText = params['search'] || '';
        });

        // console.log(this.searchText)
        //
        // this.weatherApi.getCity(this.lat, this.lon).subscribe(data => {
        //     this.weatherApi.selectedCity.next(data);
        //     this.cdr.markForCheck();
        //     console.log(data)
        // })

    }

    // protected updateFilters(search: string, tab: string = "") {
    //     this.router.navigate([], {
    //         queryParams: {
    //             search: search ? search : null,
    //             tab: tab ? tab : null,
    //         },
    //         queryParamsHandling: 'merge',
    //     });
    // }

    protected onInput(): void {
        this.onInputEvent.emit(this.searchText)
    }

    protected clickItem(item: City): void {
        this.onClickEvent.emit(item);
    }

    protected showDropdown(): void {
        this.isDropdownVisible.set(true)
    }

    protected hideDropdown(): void {
        this.isDropdownVisible.set(false);
    }
}
