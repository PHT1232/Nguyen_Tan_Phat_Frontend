import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { LayoutStoreService } from '@shared/layout/layout-store.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  templateUrl: './app.component.html',
})
export class AppComponent extends AppComponentBase implements OnInit {
  sidebarExpanded: boolean;
  sidebarStyle = 'display: block;';

  constructor(
    injector: Injector,
    private config: PrimeNGConfig,
    private renderer: Renderer2,
    private _layoutStore: LayoutStoreService,
    private primengconfig: PrimeNGConfig
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'sidebar-mini');

    this.config.setTranslation( {
      monthNames: ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],
      monthNamesShort: ["1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12"],
      dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
      dayNamesShort:	["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
      dayNamesMin:	["CN","T.2","T.3","T.4","T.5","T.6","T.7"]
      }
    )

    SignalRAspNetCoreHelper.initSignalR();

    abp.event.on('abp.notifications.received', (userNotification) => {
      abp.notifications.showUiNotifyForUserNotification(userNotification);

      // Desktop notification
      Push.create('AbpZeroTemplate', {
        body: userNotification.notification.data.message,
        icon: abp.appPath + 'assets/app-logo-small.png',
        timeout: 6000,
        onClick: function () {
          window.focus();
          this.close();
        }
      });
    });

    this._layoutStore.sidebarExpanded.subscribe((value) => {
      this.sidebarExpanded = value;
    });
  }

  toggleSidebar(): void {
    this._layoutStore.setSidebarExpanded(!this.sidebarExpanded);
    
  }

  toggleSidebarDisplay(): void {
    if (!this.sidebarExpanded) {
      this.sidebarStyle = 'display: block;'
      console.log("! sidebar" + this.sidebarStyle);
    } else {
      this.sidebarStyle = 'display: none;'
      console.log(this.sidebarStyle);
    }
  }
}
