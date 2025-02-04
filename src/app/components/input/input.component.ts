import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {WeatherApiService} from "../../services/weather-api.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {City} from "../../interfaces/city";
import {ActivatedRoute, Router, RouterModule} from '@angular/router';

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

    protected searchText: string = '';
    protected cities: City[] = [];
    protected isDropdownVisible = signal(false)

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.searchText = params['search'] || '';
        });
    }

    protected updateFilters() {
        this.router.navigate([], {
            queryParams: {search: this.searchText ? this.searchText : null},
            queryParamsHandling: 'merge',
        });
    }

    protected onInput(): void {
        if (this.searchText) {
            this.weatherApi.getCites(this.searchText).subscribe(data => {
                this.cities = data;
                console.log((data))
            });
        }
    }

    protected clickCity(lat: number, lon: number): void {
        this.weatherApi.getCity(lat, lon).subscribe(data => {
            console.log((data))
        });
    }

    protected showDropdown(): void {
        this.isDropdownVisible.set(true)
    }

    protected hideDropdown(): void {
        this.isDropdownVisible.set(false);
    }
}
