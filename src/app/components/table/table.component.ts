import {ChangeDetectionStrategy, Component, inject, Input, OnInit, signal} from '@angular/core';
import {Router} from "@angular/router";
import {WeatherApiService} from "../../services/weather-api.service";
import {Tabs} from "../../const/tabs";
import {KelvinToCelciusPipe} from "../../pipes/kelvin-to-celcius.pipe";
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    imports: [
        KelvinToCelciusPipe,
        NgOptimizedImage,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    private weatherApi = inject(WeatherApiService);

    @Input() curTab: Tabs | undefined;

    protected selectedCity = this.weatherApi.selectedCity;
    protected readonly Tabs = Tabs;
}
