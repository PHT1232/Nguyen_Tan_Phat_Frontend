import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { LayoutStoreService } from '@shared/layout/layout-store.service';

@Component({
  selector: 'header-left-navbar',
  templateUrl: './header-left-navbar.component.html',
  styleUrls: ['./style-sidebar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLeftNavbarComponent implements OnInit {
  sidebarExpanded: boolean;
  arrow_i = 'font-size: 30px;';

  constructor(private _layoutStore: LayoutStoreService,
    private _location: Location,
    private appMain: AppComponent) {}

  ngOnInit(): void {
    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
  }

  BackPage(): void {
    // this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
    // this.appMain.toggleSidebarDisplay();
    this._location.back();
  }
}
