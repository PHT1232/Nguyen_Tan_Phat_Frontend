import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { AppComponentBase } from '@shared/app-component-base';
import { BankAccount } from '@shared/service-proxies/dtos/BankAccount';
import { CustomerInputDto } from '@shared/service-proxies/dtos/customer/CustomerInputDto';
import { CustomerServiceProxy, PermissionDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent extends AppComponentBase implements OnInit {
  saving = false;
  customer = new CustomerInputDto();
  customerBank = new BankAccount();
  permissions: PermissionDto[] = [];
  isExist: boolean[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  id = '';

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private router: ActivatedRoute,
    private _customerService: CustomerServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id']
    });
    this._customerService.get(this.id).subscribe(result => {
        this.customer = result;
        this.customer.discount = result.discount;
        this.customerBank = result.bankAccount;
    });
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
    customerAdd.bankAccount = this.customerBank;
    customerAdd.discount = this.customer.discount;

    this._customerService.update(customerAdd).subscribe(
      () => {
        this.appMain.showSuccessMessage('Cập nhật thành công', 'Cập nhật khách hàng thành công')
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
      || this.customer.customerEmail === undefined
      || this.customer.customerAddress === undefined
      || this.customer.customerPhone === undefined
      || this.customer.customerDescription === undefined
      || this.customer.customerWebsite === undefined
      || this.customerBank.bankId === undefined
      || this.customerBank.bankName === undefined
      || this.customerBank.bankCity === undefined
      || this.customerBank.bankAddress === undefined
      || this.customer.customerCode === ''
      || this.customer.customerName === ''
      || this.customer.customerEmail === ''
      || this.customer.customerAddress === ''
      || this.customer.customerPhone === ''
      || this.customer.customerDescription === ''
      || this.customer.customerWebsite === ''
      || this.customerBank.bankName === ''
      || this.customerBank.bankCity === ''
      || this.customerBank.bankAddress === ''
      ) {
        console.log("1 check form valid");
        return true;
    }
  }
}