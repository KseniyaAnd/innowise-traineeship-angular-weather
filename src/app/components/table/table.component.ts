import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {OneDayTabComponent} from "../one-day-tab/one-day-tab.component";
import {WeatherApiService} from "../../services/weather-api.service";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-table',
    imports: [
        OneDayTabComponent,
        AsyncPipe,

    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    private weatherApi = inject(WeatherApiService)

    protected firstTab = this.weatherApi.firstTab;
    protected secondTab = this.weatherApi.secondTab;

    constructor(
        private cdr: ChangeDetectorRef
    ) {
    }

    toggleFirstTab() {
        this.firstTab.next(false);
        this.secondTab.next(true);
        this.cdr.markForCheck();
    }

    toggleSecondTab() {
        this.firstTab.next(true);
        this.secondTab.next(false);
        this.cdr.markForCheck();
    }


}
