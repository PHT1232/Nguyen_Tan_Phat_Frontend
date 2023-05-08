import { formatDate } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { BankAccount } from '@shared/service-proxies/dtos/BankAccount';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';
import { CMNDDto } from '@shared/service-proxies/dtos/employee/CMNDDto';
import { EmployeeInputDto } from '@shared/service-proxies/dtos/employee/EmployeeInputDto';
import { EmployeeServiceProxy, PermissionDto, StructureServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  animations: [appModuleAnimation()]
})
export class EditEmployeeComponent extends AppComponentBase implements OnInit{
  saving = false;
  employee = new EmployeeInputDto();
  employeeBank = new BankAccount();
  employeeCmnd = new CMNDDto();
  getStructure: StructureSelectDto[] = [];
  permissions: PermissionDto[] = [];
  isExist: boolean[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  id = "";

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private router: ActivatedRoute,
    private _employeeService: EmployeeServiceProxy,
    private _structureService: StructureServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    });
    this._employeeService.get(this.id).subscribe(employeeOutput => {
      this.employee.employeeCode = employeeOutput.employeeCode;
      this.employee.employeeName = employeeOutput.employeeName;
      this.employee.employeeGender = employeeOutput.employeeGender;
      let formattedEmployeeDOB = formatDate(employeeOutput.employeeDateOfBirth, 'yyyy-MM-dd', 'en_US')
      this.employee.employeeDateOfBirth = new Date(formattedEmployeeDOB);
      this.employeeCmnd = employeeOutput.employeeCMND;
      let formattedNgayCap = formatDate(employeeOutput.employeeCMND.ngayCap, 'yyyy-MM-dd', 'en_US')
      this.employeeCmnd.ngayCap = new Date(formattedNgayCap);
      this.employee.jobTitle = employeeOutput.jobTitle;
      this.employee.workUnit = employeeOutput.workUnit;
      this.employee.taxIdentification = employeeOutput.taxIdentification;
      this.employee.employeeSalary = employeeOutput.employeeSalary;
      this.employee.salaryFactor = employeeOutput.salaryFactor;
      this.employee.typeOfContract = employeeOutput.typeOfContract;
      this.employeeBank = employeeOutput.employeeBankAccount;
    });
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
    employeeAdd.workUnit = this.employee.workUnit;
    employeeAdd.taxIdentification = this.employee.taxIdentification;
    employeeAdd.employeeSalary = this.employee.employeeSalary;
    employeeAdd.salaryFactor = this.employee.salaryFactor;
    employeeAdd.typeOfContract = this.employee.typeOfContract;
    employeeAdd.employeeBankAccount = this.employeeBank;

    this._employeeService.update(employeeAdd).subscribe(
      () => {
        this.appMain.showSuccessMessage('Cập nhật thành công', 'Cập nhật nhân viên thành công')
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
      || this.employee.workUnit === undefined
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
