import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Router} from "@angular/router";
import {WeatherApiService} from "../../services/weather-api.service";
import {Tabs} from "../../const/tabs";
import {KelvinToCelciusPipe} from "../pipes/kelvin-to-celcius.pipe";
import {NgOptimizedImage} from "@angular/common";
import {ToDayMonthPipe} from "../pipes/to-day-month.pipe";
import {ToHoursPipe} from "../pipes/to-hours.pipe";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    imports: [
        KelvinToCelciusPipe,
        NgOptimizedImage,
        ToDayMonthPipe,
        ToHoursPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit{
    private weatherApi = inject(WeatherApiService);
    private router = inject(Router);

    protected selectedCity = this.weatherApi.selectedCity;
    protected curTab = signal(Tabs.OneDay);

    ngOnInit(): void {
        this.updateParamTab(this.curTab())
    }

    setTab(tabName: Tabs) {
        this.curTab.set(tabName);
        this.updateParamTab(tabName)
    }

    protected updateParamTab(tab: Tabs | null = null) {
        this.router.navigate([], {
            queryParams: {
                tab: tab ? tab : null,
            },
            queryParamsHandling: 'merge',
        });
    }

    protected readonly Tabs = Tabs;
}
