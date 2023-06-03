import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { BankAccount } from '@shared/service-proxies/dtos/BankAccount';
import { CustomerInputDto } from '@shared/service-proxies/dtos/customer/CustomerInputDto';
import { CustomerServiceProxy, PermissionDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateCustomerComponent extends AppComponentBase implements OnInit {
  saving = false;
  customer = new CustomerInputDto();
  customerBank = new BankAccount();
  permissions: PermissionDto[] = [];
  isExist: boolean[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _customerService: CustomerServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
  }

  ngOnInit(): void {
  }

  save(): void {
    this.saving = true;
    const customerAdd = new CustomerInputDto();
    customerAdd.customerCode = this.customer.customerCode;
    customerAdd.customerName = this.customer.customerName;
    customerAdd.customerEmail = this.customer.customerEmail;
    customerAdd.customerAddress = this.customer.customerAddress;
    customerAdd.customerPhone = this.customer.customerPhone;
    customerAdd.customerDescription = this.customer.customerDescription;
    customerAdd.customerWebsite = this.customer.customerWebsite;
    console.log(this.customer.discount);
    customerAdd.discount = this.customer.discount;
    customerAdd.bankAccount = this.customerBank;

    this._customerService.create(customerAdd).subscribe(
      () => {
        this.appMain.showSuccessMessage('Thêm mới thành công', 'Thêm mới khách hàng thành công')
        this.onSave.emit();
        this._router.navigate(['app/customer']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  Cancel(): void {
    this._router.navigate(['app/customer']);
  }

  checkFormValid(): boolean {
    if (this.customer.customerCode === undefined
      || this.customer.customerName === undefined
      || this.customer.customerAddress === undefined
      || this.customer.customerPhone === undefined
      || this.customer.customerCode === ''
      || this.customer.customerName === ''
      || this.customer.customerAddress === ''
      || this.customer.customerPhone === ''
      ) {
        console.log("1 check form valid");
        return true;
    }
  }
}
