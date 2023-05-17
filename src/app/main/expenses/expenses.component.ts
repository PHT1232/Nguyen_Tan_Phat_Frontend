import { Component, Injector } from '@angular/core';
import { ExpensesGetAllDto } from '@shared/service-proxies/dtos/expenses/ExpensesGetAllDto';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { StorageProductDetailList } from '@shared/service-proxies/dtos/products/StorageProductDetail';
import { ExpensesService, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponent } from '@app/app.component';
import { ExpensesGetAllPagedResultDto } from '@shared/service-proxies/dtos/expenses/ExpensesGetAllPagedResultDto';
import { ExpensesInputDto } from '@shared/service-proxies/dtos/expenses/ExpensesInputDto';
import { finalize } from 'rxjs';

class PagedExpensesRequestDto extends PagedRequestDto {
  keyword: string;
  storageCode: string;
  dateTime: string[] = [];
  orderStatus: number;
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent extends PagedListingComponentBase<ExpensesGetAllDto>{
  exportImports: ExpensesGetAllDto[];
  keyword = "";
  storageCode = "0";
  orderStatus = 1;
  nameOfReciever = "";
  bsInlineRangeValue: Date[];
  expensesList: ExpensesGetAllDto[] = [];
  getStorage: StorageProductDetailList = new StorageProductDetailList();
  totalCount: number;
  isLoading = false;
  first: number = 0;
  rows: number = 6;

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _expensesService: ExpensesService,
    private appMain: AppComponent
  ) {
    super(injector);
    this._productService.getStorageProduct().subscribe((val) => {
      this.getStorage = val;
      // this.storageCode = val[val.items.length].storageCode;
    });
  }

  list(
    request: PagedExpensesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    // throw new Error('Method not implemented.');
    this.isLoading = true;
    request.keyword = this.keyword;
    request.orderStatus = this.orderStatus;
    setTimeout(() => {
      request.storageCode = this.storageCode;
      if (this.bsInlineRangeValue !== undefined) {
        request.dateTime = [];
        this.bsInlineRangeValue.forEach(element => {
          var date = element.toLocaleString();
          
          request.dateTime.push(date);
        });
      }
      

      this._expensesService
        .getAll(
          request.keyword,
          request.storageCode,
          request.dateTime,
          request.orderStatus,
          request.skipCount,
          request.maxResultCount
        )
        .pipe(
          finalize(() => {
            finishedCallback();
          })
        )
        .subscribe((result: ExpensesGetAllPagedResultDto) => {
          this.exportImportList = result.items;
          this.showPaging(result, pageNumber);
          this.isLoading = false;
        });
    }, 500);
  }
  delete(entity: ExpensesGetAllDto): void {
    this.swal
      .fire({
        title: "Bạn có chắc?",
        text: "Hủy đơn",
        showCancelButton: true,
        confirmButtonColor: this.confirmButtonColor,
        cancelButtonColor: this.cancelButtonColor,
        cancelButtonText: "Hủy",
        confirmButtonText: "Hủy đơn",
        reverseButtons: this.ReverseButtons,
        icon: "warning",
      })
      .then((result) => {
        if (result.value) {
          let input = new ExpensesInputDto();
          input.expensesCode = entity.expensesCode;
          input.orderStatus = 3;
          this._expensesService.updateOrder(input).subscribe(
            () => {
              this.appMain.showSuccessMessage('Cập nhật thành công', 'Hủy đơn thành công');
              this.refresh();
            },
            () => {}
          );
        }
      });
  }

  finishOrder(entity: ExpensesGetAllDto): void {
    this.swal
      .fire({
        title: "Bạn có chắc?",
        text: "Hoàn thành đơn",
        showCancelButton: true,
        confirmButtonColor: this.confirmButtonColor,
        cancelButtonColor: this.cancelButtonColor,
        cancelButtonText: "Hủy",
        confirmButtonText: "hoàn thành",
        reverseButtons: this.ReverseButtons,
        icon: "warning",
      })
      .then((result) => {
        if (result.value) {
          let input = new ExpensesInputDto();
          input.expensesCode = entity.expensesCode;
          input.orderStatus = 2;
          this._expensesService.updateOrder(input).subscribe(
            () => {
              this.appMain.showSuccessMessage('Cập nhật thành công', 'Hoàn thành đơn');
              this.refresh();
            },
            () => {}
          );
        }
      });
  }

  checkDate() {
    console.log(this.bsInlineRangeValue.toLocaleString());
  }
}
