import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { BankAccount } from '@shared/service-proxies/dtos/BankAccount';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';
import { CMNDDto } from '@shared/service-proxies/dtos/employee/CMNDDto';
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
  employeeBank = new BankAccount();
  employeeCmnd = new CMNDDto();
  getStructure: StructureSelectDto[] = [];
  selectedStructure = new StructureSelectDto();
  permissions: PermissionDto[] = [];
  isExist: boolean[] = [];
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
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
      this.getStructure.push(new StructureSelectDto({code: "0", name: "CÔNG TY CỔ PHẦN UNTEN"}))
    })
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;
    const employeeAdd = new EmployeeInputDto();
    employeeAdd.employeeCode = this.employee.employeeCode;
    employeeAdd.employeeName = this.employee.employeeName;
    employeeAdd.employeeGender = this.employee.employeeGender;
    employeeAdd.employeeDateOfBirth = this.employee.employeeDateOfBirth;
    employeeAdd.employeeCMND = this.employeeCmnd;
    employeeAdd.jobTitle = this.employee.jobTitle;
    employeeAdd.workUnit = this.selectedStructure.code;
    employeeAdd.taxIdentification = this.employee.taxIdentification;
    employeeAdd.employeeSalary = this.employee.employeeSalary;
    employeeAdd.salaryFactor = this.employee.salaryFactor;
    employeeAdd.typeOfContract = this.employee.typeOfContract;
    employeeAdd.employeeBankAccount = this.employeeBank;
    employeeAdd.phoneNumber = this.employee.phoneNumber;

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
      || this.employee.employeeName === undefined 
      || this.employee.employeeGender === undefined 
      || this.employee.employeeDateOfBirth === undefined 
      || this.employeeCmnd.soCMND === undefined
      || this.employeeCmnd.quocTich === undefined
      || this.employeeCmnd.noiCap === undefined
      || this.employeeCmnd.ngayCap === undefined
      || this.employee.jobTitle === undefined
      || this.selectedStructure === undefined
      || this.employee.employeeSalary === undefined
      || this.employee.typeOfContract === undefined
      || this.employee.employeeCode === '' 
      || this.employee.employeeName === '' 
      || this.employee.employeeGender === '' 
      || this.employeeCmnd.soCMND === ''
      || this.employeeCmnd.quocTich === ''
      || this.employeeCmnd.noiCap === ''
      || this.employee.jobTitle === ''
      || this.employee.workUnit === ''
      || this.employee.employeeSalary === null
      || this.employee.typeOfContract === ''
      ) {
        console.log("1 check form valid");
        return true;
    }
  }
}
