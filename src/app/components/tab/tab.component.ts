import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {WeatherApiService} from "../../services/weather-api.service";

@Component({
    selector: 'app-tab',
    imports: [],
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TabComponent {
    private weatherApi = inject(WeatherApiService)

    // todo one-day-tab -> перенести в enum или type
    @Input() curTab = 'one-day-tab'

    protected selectedCity = this.weatherApi.selectedCity;
}
