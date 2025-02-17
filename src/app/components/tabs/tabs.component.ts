import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {Router} from "@angular/router";
import {Tabs} from "../../const/tabs";

@Component({
  selector: 'app-tabs',
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements OnInit {
  private router = inject(Router);
  protected curTab = signal(Tabs.OneDay);

  protected readonly Tabs = Tabs;

  @Output() onClickEvent = new EventEmitter<Tabs>();


  ngOnInit(): void {
    this.updateParamTab(this.curTab())
  }

  setTab(tabName: Tabs) {
    this.curTab.set(tabName);
    this.updateParamTab(tabName)
    this.onClickEvent.emit(tabName);
  }

  protected updateParamTab(tab: Tabs | null = null) {
    this.router.navigate([], {
      queryParams: {
        tab: tab ? tab : null,
      },
      queryParamsHandling: 'merge',
    });
  }

}
