import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { LookUpTableList } from '@shared/service-proxies/dtos/LookUpTable';
import { ExpensesInputDto } from '@shared/service-proxies/dtos/expenses/ExpensesInputDto';
import { ExpensesProductDto } from '@shared/service-proxies/dtos/expenses/ExpensesProductDto';
import { ExpensesProductPagedResultDto } from '@shared/service-proxies/dtos/expenses/ExpensesProductPagedResultDto';
import { StorageProductDetailList } from '@shared/service-proxies/dtos/products/StorageProductDetail';
import { CustomerDto, ExpensesService, ProductServiceProxy } from '@shared/service-proxies/service-proxies';

class PagedProductRequestDto extends PagedRequestDto {
  storageCode: string;
  IsInsert: boolean;
}

class InitialProductQuantity {
  id: string;
  quantity: number;
}

@Component({
  selector: 'app-detail-expenses',
  templateUrl: './detail-expenses.component.html',
  styleUrls: ['./detail-expenses.component.css']
})
export class DetailExpensesComponent extends AppComponentBase implements OnInit {
  isCollapsed = false;
  expense = new ExpensesInputDto();
  storageCode = '';
  keyword: string;
  getStorage: StorageProductDetailList = new StorageProductDetailList();
  orderType = 1;
  products: ExpensesProductDto[] = [];
  user: LookUpTableList = new LookUpTableList();
  customer = new CustomerDto();
  request: PagedProductRequestDto;
  pageSize = 5;
  pageNumber = 1;
  totalPages = 1;
  skipCount = (1 - 1) * this.pageSize;
  isTrue = true;
  quantityCheck: boolean[] = [];
  totalItems: number;
  isTableLoading = false;
  initialProductQuantity: InitialProductQuantity[] = [];
  id: string;
  totalAmountAfterDiscount = 0;

  @Output() onsave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _expenseSerivce: ExpensesService,
    private router: ActivatedRoute,
    private _productService: ProductServiceProxy
  ) {
    super(injector);
    this._productService.getStorageProduct().subscribe(val => {
      this.getStorage = val;
      this.storageCode = val[val.items.length - 1].storageCode;
    });

    this.router.params.subscribe(params => {
      this.id = params['id']
    });

    setTimeout(() => {
      this.isTableLoading = true;
      this._expenseSerivce.get(this.id).subscribe((result: ExpensesInputDto) => {
        this.expense.expensesCode = result.expensesCode;
        this.expense.employeeCode = result.employeeCode;
        this.expense.orderStatus = result.orderStatus;
        this.expense.productProvider = result.productProvider;
        this.products = result.products;
        this.expense.storageId = result.storageId;
        this.expense.discount = result.discount;
        this.expense.paymentDate = result.paymentDate;
        this.expense.description = result.description;
        this.expense.totalPrice = result.totalPrice;
        this.totalAmountAfterDiscount = result.totalPrice - (result.totalPrice * (result.discount / 100));
        this.isTableLoading = false;
      });
    }, 300);
    
  }

  ngOnInit(): void {
  }

  public showPaging(result: ExpensesProductPagedResultDto, pageNumber: number): void {
    this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

    this.totalItems = result.totalCount;
    this.pageNumber = pageNumber;
}

  Cancel(): void {
    this._router.navigate(['app/expense']);
  }

  getProductPage() {

  }
}
