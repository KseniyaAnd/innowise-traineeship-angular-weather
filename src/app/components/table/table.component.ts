import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {TabComponent} from "../tab/tab.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-table',
    imports: [
        TabComponent,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit{
    private router = inject(Router);

    protected curTab = signal('one-day-tab');

    ngOnInit(): void {
        this.updateParamTab(this.curTab())
    }

    setTab(tabName: string) {
        this.curTab.set(tabName);
        this.updateParamTab(tabName)
    }

    protected updateParamTab(tab: string = "") {
        this.router.navigate([], {
            queryParams: {
                tab: tab ? tab : null,
            },
            queryParamsHandling: 'merge',
        });
    }

}
