import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';
import { EmployeeInputDto } from '@shared/service-proxies/dtos/employee/EmployeeInputDto';
import { EmployeeServiceProxy, PermissionDto, StructureServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateEmployeeComponent extends AppComponentBase implements OnInit {
  saving = false;
  employee = new EmployeeInputDto();
  getemployee: StructureSelectDto[] = [];
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _employeeService: EmployeeServiceProxy,
    private _structureService: StructureServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
    this._employeeService.getStructureSelect().subscribe(val => {
      this.getemployee = val.items;
    })
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;
    const employeeAdd = new EmployeeInputDto();
    employeeAdd.init(this.employee);

    console.log(this.employee.employeeCode)

    this._employeeService.create(employeeAdd).subscribe(
      () => {
        this.appMain.showSuccessMessage('Thêm mới thành công', 'Thêm mới nhân viên thành công')
        this.onSave.emit();
        this._router.navigate(['app/employee']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  Cancel(): void {
    this._router.navigate(['app/employee']);
  }

  checkFormValid(): boolean {
    if (this.employee.employeeCode === undefined 
      || this.employee.employeeGender === undefined 
      || this.employee.unitOf === undefined 
      || this.employee.levelOfUnit === undefined 
      // || this.storageSelect.length === 0
      || this.employee.address === ''
      || this.employee.businessRN === undefined
      || this.employee.issuedDate === undefined
      || this.employee.issuedPlace === undefined
      ) {
        console.log("1 check form valid");
        return true;
    }
  }
}
