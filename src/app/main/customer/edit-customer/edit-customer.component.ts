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
        this.customerBank = result.bankAccount;
    });
  }

  save(): void {
    this.saving = true;
    const customerAdd = new CustomerInputDto();
    customerAdd.orgCustomerCode = this.customer.orgCustomerCode;
    customerAdd.orgCustomerName = this.customer.orgCustomerName;
    customerAdd.orgCustomerEmail = this.customer.orgCustomerEmail;
    customerAdd.orgCustomerAddress = this.customer.orgCustomerAddress;
    customerAdd.orgCustomerPhone = this.customer.orgCustomerPhone;
    customerAdd.orgCustomerDescription = this.customer.orgCustomerDescription;
    customerAdd.orgCustomerWebsite = this.customer.orgCustomerWebsite;
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
    if (this.customer.orgCustomerCode === undefined
      || this.customer.orgCustomerName === undefined
      || this.customer.orgCustomerEmail === undefined
      || this.customer.orgCustomerAddress === undefined
      || this.customer.orgCustomerPhone === undefined
      || this.customer.orgCustomerDescription === undefined
      || this.customer.orgCustomerWebsite === undefined
      || this.customerBank.bankId === undefined
      || this.customerBank.bankName === undefined
      || this.customerBank.bankCity === undefined
      || this.customerBank.bankAddress === undefined
      || this.customer.orgCustomerCode === ''
      || this.customer.orgCustomerName === ''
      || this.customer.orgCustomerEmail === ''
      || this.customer.orgCustomerAddress === ''
      || this.customer.orgCustomerPhone === ''
      || this.customer.orgCustomerDescription === ''
      || this.customer.orgCustomerWebsite === ''
      || this.customerBank.bankName === ''
      || this.customerBank.bankCity === ''
      || this.customerBank.bankAddress === ''
      ) {
        console.log("1 check form valid");
        return true;
    }
  }
}