import { Component, Injector } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CustomerGetAllDto } from '@shared/service-proxies/dtos/customer/CustomerGetAllDto';
import { CustomerGetAllDtoPagedResultDto } from '@shared/service-proxies/dtos/customer/CustomerGetAllPagedResultDto';
import { CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { catchError, finalize, throwError } from 'rxjs';

class PagedCustomerRequestDto extends PagedRequestDto {
  keyword: string;
  isRetail: boolean;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends PagedListingComponentBase<CustomerGetAllDto> {
  keyword = '';
  List: CustomerGetAllDto[] = [];
  listToDelete: CustomerGetAllDto[] = [];
  totalCount: number;
  first: number = 0;
  rows: number = 6;
  customerSelect = 1;

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
  }

  list(request: PagedCustomerRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;

    setTimeout(() => { 
      console.log(request.keyword);
      
      if (this.customerSelect === 1) {
        request.isRetail = false;
      } else {
        request.isRetail = true;
      }

      this._customerService
      .getAll(request.keyword, request.skipCount, request.isRetail, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CustomerGetAllDtoPagedResultDto) => {
        this.List = result.items;
        this.showPaging(result, pageNumber);
      });
    },500);
  }
  delete(entity: CustomerGetAllDto): void {
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: 'Khách hàng sẽ bị xóa',
      showCancelButton: true,
      confirmButtonColor: this.confirmButtonColor,
      cancelButtonColor: this.cancelButtonColor,
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
      reverseButtons: this.ReverseButtons,
      icon: 'warning',
    })
    .then((result) => {
      if (result.value) {
        this._customerService.delete(entity.customerCode).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: () => {
              this.appMain.showSuccessMessage('Xóa thành công', 'Xóa thành công khách hàng');
              this.refresh();
            },
            error: (error) => {
              console.log(error);
              if (error.error && error.error.message) {
                this.notify.error(error.error.message);
              }
            },
            complete() {
              
            },
          })
      }
    });
  }

  searched() {
    if (this.keyword !== undefined) {
      this.rows = this.totalItems;
      this.pageSize = this.totalItems;
    }
  }
}
