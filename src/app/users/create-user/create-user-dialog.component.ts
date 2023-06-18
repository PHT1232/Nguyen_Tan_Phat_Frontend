import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
  CreateUserDto,
  RoleDto,
  EmployeeServiceProxy
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { EmployeeSelectForAccount, EmployeeSelectForAccountList } from '@shared/service-proxies/dtos/employee/EmployeeSelectForAccount';
import { AppComponent } from '@app/app.component';

@Component({
  templateUrl: './create-user-dialog.component.html'
})
export class CreateUserDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  user = new CreateUserDto();
  employee: EmployeeSelectForAccount[];
  employeeSelected = new EmployeeSelectForAccount();
  roles: RoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};
  defaultRoleCheckedStatus = false;
  passwordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'pattern',
      localizationKey:
        'PasswordsMustBeAtLeast8CharactersContainLowercaseUppercaseNumber',
    },
  ];
  confirmPasswordValidationErrors: Partial<AbpValidationError>[] = [
    {
      name: 'validateEqual',
      localizationKey: 'PasswordsDoNotMatch',
    },
  ];

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _userService: UserServiceProxy,
    public _employeeService: EmployeeServiceProxy,
    // public appMain: AppComponent,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
    this._employeeService.getEmployeeForSelect().subscribe((result) => {
      this.employee = result.items;
      // result.items.forEach(element => {
      //   console.log(element.code)
      //   this.employee.push(
      //     new EmployeeSelectForAccount (
      //       { name: element.name, code: element.code}
      //       )
      //     )
      // });
    })
  }

  ngOnInit(): void {
    this.user.isActive = true;

    this._userService.getRoles().subscribe((result) => {
      this.roles = result.items;
      this.setInitialRolesStatus();
    });

    
  }

  setInitialRolesStatus(): void {
    _map(this.roles, (item) => {
      this.checkedRolesMap[item.normalizedName] = this.isRoleChecked(
        item.normalizedName
      );
    });
  }

  isRoleChecked(normalizedName: string): boolean {
    // just return default role checked status
    // it's better to use a setting
    return this.defaultRoleCheckedStatus;
  }

  onRoleChange(role: RoleDto, $event) {
    this.checkedRolesMap[role.normalizedName] = $event.target.checked;
  }

  getCheckedRoles(): string[] {
    const roles: string[] = [];
    _forEach(this.checkedRolesMap, function (value, key) {
      if (value) {
        roles.push(key);
      }
    });
    return roles;
  }

  save(): void {
    this.saving = true;
    this.user.roleNames = this.getCheckedRoles();
    console.log(this.employeeSelected.name);
    this.user.surname = this.employeeSelected.name;
    this.user.userName = this.employeeSelected.code;
    this.user.name = this.employeeSelected.name;
    this._userService.create(this.user).subscribe(
      () => {
        this.notify.info(this.l('Lưu thành công'));
        // this.appMain.showSuccessMessage("Thành công", "Tạo tài khoản thành công")
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
