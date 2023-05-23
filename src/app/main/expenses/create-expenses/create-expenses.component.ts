import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { LookUpTable, LookUpTableList } from '@shared/service-proxies/dtos/LookUpTable';
import { EmployeeSelectForAccount } from '@shared/service-proxies/dtos/employee/EmployeeSelectForAccount';
import { ExpensesInputDto } from '@shared/service-proxies/dtos/expenses/ExpensesInputDto';
import { ExpensesProductDto } from '@shared/service-proxies/dtos/expenses/ExpensesProductDto';
import { ExpensesProductPagedResultDto } from '@shared/service-proxies/dtos/expenses/ExpensesProductPagedResultDto';
import { StorageProductDetailList } from '@shared/service-proxies/dtos/products/StorageProductDetail';
import { EmployeeServiceProxy, ExpensesService, ExportImportProductDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';

class PagedProductRequestDto extends PagedRequestDto {
  storageCode: string;
  IsInsert: boolean;
}

class InitialProductQuantity {
  id: string;
  quantity: number;
}

@Component({
  selector: 'app-create-expenses',
  templateUrl: './create-expenses.component.html',
  styleUrls: ['./create-expenses.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateExpensesComponent extends AppComponentBase implements OnInit {
  saving = false;
  isCollapsed = false;
  expenses = new ExpensesInputDto();
  storageCode = new LookUpTable();
  keyword: string;
  getStorage: LookUpTable[];
  orderType = 1;
  products1: ExpensesProductDto[] = [];
  user: LookUpTableList = new LookUpTableList();
  request: PagedProductRequestDto;
  employee: EmployeeSelectForAccount[];
  employeeSelected = new EmployeeSelectForAccount();
  rows = 5;
  first = 1;
  skipCount = (1 - 1) * this.rows;
  isTrue = true;
  quantityCheck: boolean[] = [];
  totalItems: number;
  initialProductQuantity: InitialProductQuantity[] = [];
  isExist = false;
  isTableLoading = false;
  selectedProducts: ExpensesProductDto[] = [];
  errorMessage = 'Không được trùng kho';

  @Output() onsave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _expensesImport: ExpensesService,
    private _productservice: ProductServiceProxy,
    public _employeeService: EmployeeServiceProxy,
    private appMain: AppComponent
  ) {
    super(injector);
    this._productservice.getStorageExpense().subscribe(val => {
      this.getStorage = val.items;
      // this.storageCode = val[val.length - 1].storageCode;
    });

    this._employeeService.getEmployeeForSelect().subscribe((result) => {
      this.employee = result.items;
    });

    setTimeout(() => {
      this._expensesImport.getProduct(this.storageCode.code, true, this.keyword, this.skipCount, this.rows)
      .subscribe((result: ExpensesProductPagedResultDto) => {
        this.products1 = result.items;
        this.totalItems = result.totalCount;
        for (let i = 0; i < this.products1.length; i++) {
          this.quantityCheck[i] = true;
          let productQuantity = new InitialProductQuantity();
          productQuantity.id = this.products1[i].productId;
          productQuantity.quantity = this.products1[i].quantity;
          this.initialProductQuantity.push(productQuantity);
        }
      });
    }, 300);
   
    this._expensesImport.getUser()
    .subscribe(val => {
      this.user = val;
    });

    this.expenses.products = [];
    this.expenses.employeeCode = "0";
  }

  ngOnInit(): void {
  }

  save2(): void {
    let totalPrice = 0; 
    this.saving = true;
    this.expenses.storageId = this.storageCode.code;
    console.log(
      this.expenses.productProvider);
    this.selectedProducts.forEach(element => {
        // console.log("quantity: " + element.quantity);
        // console.log("finalprice: " + element.finalPrice);
        element.finalPrice = element.quantity * element.price;
        totalPrice += element.finalPrice;
        this.expenses.products.push(element);  
    });
    this.expenses.employeeCode = this.employeeSelected.code;

    this.expenses.totalPrice = totalPrice;
    this.expenses.orderStatus = 1;
    this._expensesImport.create(this.expenses).subscribe(
      () => {
        this.appMain.showSuccessMessage("Thành công", "Tạo đơn thành công")
        this.onsave.emit();
        this._router.navigate(['app/expense']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  Cancel(): void {
    this._router.navigate(['app/expense']);
  }

  checkFormValid(): boolean {
    // this.isTrue = true;

    if (
      this.selectedProducts.length === 0
      || this.expenses.expensesCode === ''
      || this.expenses.employeeCode === ""
      || this.storageCode === undefined
      ) {
      return true;
    }

    // for (let i = 0; i < this.quantityCheck.length; i++) {
    //   if (this.quantityCheck[i] === false) {
    //     this.isTrue = false;
    //     return false;
    //   }
    // }

    // if (this.isTrue) {
    //   this.isTrue = true;
      // return true;
    // }
  }

  getRandomCode() {
    this._expensesImport.getRandomCode()
    .subscribe(val => {
      this.expenses.expensesCode = val;
    });
  }
  
  changeQuantity(productTemp: ExpensesProductDto) {
    this.expenses.products.forEach((element, index) => {
      if (element.productId === productTemp.productId) {
        this.expenses.products[index].quantity = productTemp.quantity;
        this.expenses.products[index].finalPrice = productTemp.quantity * productTemp.price;
      }
    });
  }

  AddItem(productTemp: ExpensesProductDto, index: number) {
    if (this.quantityCheck[index] === false) {
      var indexToSlice = 0;
      this.expenses.products.forEach((element, index) => {
        if (element.productId === productTemp.productId) {
          indexToSlice = index; 
        }
      });
      if (this.expenses.products.length === 1) {
        this.expenses.products = [];
      } else {
        // delete this.expenses.products1[indexToSlice];
        this.expenses.products.slice(indexToSlice);
      }
      this.quantityCheck[index] = true;
    } else {
      this.expenses.products.push(productTemp);
      this.quantityCheck[index] = false;
    }
  }
  
  search(page: number) {
    this.expenses.products = [];
    this.quantityCheck = [];
    this.skipCount = page * this.rows;
    this._expensesImport.getProduct(this.storageCode.code, true, this.keyword, this.skipCount, this.rows)
    .subscribe((result: ExpensesProductPagedResultDto) => {
      this.products1 = result.items;
      this.totalItems = result.totalCount;
      for (let i = 0; i < this.products1.length; i++) {
        this.quantityCheck[i] = true;
      }
    });
  }

  getDataPage(event) {
    console.log(event.page)
    console.log(this.totalItems)
    this.rows = event.rows;
    console.log(this.rows)
    this.expenses.products = [];
    this.quantityCheck = [];
    this.skipCount = event.page * this.rows;
    this._expensesImport.getProduct(this.storageCode.code, true, this.keyword, this.skipCount, this.rows)
    .subscribe((result: ExpensesProductPagedResultDto) => {
      this.products1 = result.items;
      this.totalItems = result.totalCount;
      for (let i = 0; i < this.products1.length; i++) {
        this.quantityCheck[i] = true;
      }
    });
  }

  isProductSelected(data) {
    return this.selectedProducts.indexOf(data) > -1
  }
}