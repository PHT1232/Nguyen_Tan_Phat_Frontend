import { Component, Injector } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';

@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()],
  styleUrls: ['./login.css']
//   styles: [`
//   :host ::ng-deep .pi-eye,
//   :host ::ng-deep .pi-eye-slash {
//       transform:scale(1.6);
//       margin-right: 1rem;
//       color: var(--primary-color) !important;
//   },
// `]
})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  value: string;

  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService
  ) {
    super(injector);
  }

  get multiTenancySideIsTeanant(): boolean {
    return this._sessionService.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));
  }
}
