import { Component, Injector } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { LookUpTable } from '@shared/service-proxies/dtos/LookUpTable';
import { RetailGetAllDto } from '@shared/service-proxies/dtos/retail/RetailGetAllDto';
import { RetailGetAllPagedResultDto } from '@shared/service-proxies/dtos/retail/RetailGetAllPagedResultDto';
import { RetailInputDto } from '@shared/service-proxies/dtos/retail/RetailInputDto';
import { FileDownloadService, ProductServiceProxy, RetailService } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

class PagedRetailRequestDto extends PagedRequestDto {
  keyword: string;
  storageCode: string;
  dateTime: string[] = [];
  orderStatus: number;
}

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.css']
})
export class RetailComponent extends PagedListingComponentBase<RetailGetAllDto> {
  retail: RetailGetAllDto[];
  keyword = "";
  storageCode = new LookUpTable();
  orderStatus = 1;
  nameOfReciever = "";
  bsInlineRangeValue: Date[];
  retailList: RetailGetAllDto[] = [];
  // getStorage: StorageProductDetailList = new StorageProductDetailList();
  getStorage: LookUpTable[];
  totalCount: number;
  isLoading = false;
  first: number = 0;
  rows: number = 6;
  loading: boolean = false;

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _retailService: RetailService,
    private _fileService: FileDownloadService,
    private appMain: AppComponent
  ) {
    super(injector);
    this._productService.getStorageExpense().subscribe((val) => {
      this.getStorage = val.items;
      // this.storageCode = val[val.items.length].storageCode;
    });
  }

  list(
    request: PagedRetailRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    // throw new Error('Method not implemented.');
    this.isLoading = true;
    request.keyword = this.keyword;
    request.orderStatus = this.orderStatus;
    setTimeout(() => {
      request.storageCode = this.storageCode.code;
      if (this.bsInlineRangeValue !== undefined) {
        request.dateTime = [];
        this.bsInlineRangeValue.forEach(element => {
          var date = element.toLocaleString();
          
          request.dateTime.push(date);
        });
      }
      
      this._retailService
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
        .subscribe((result: RetailGetAllPagedResultDto) => {
          this.retailList = result.items;
          this.showPaging(result, pageNumber);
          this.isLoading = false;
        });
    }, 500);
  }
  delete(entity: RetailGetAllDto): void {
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
          let input = new RetailInputDto();
          input.retailCode = entity.retailCode;
          input.orderStatus = 3;
          this._retailService.updateOrder(input).subscribe(
            () => {
              this.appMain.showSuccessMessage('Cập nhật thành công', 'Hủy đơn thành công');
              this.refresh();
            },
            () => {}
          );
        }
      });
  }

  finishOrder(entity: RetailGetAllDto): void {
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
          let input = new RetailInputDto();
          input.retailCode = entity.retailCode;
          input.orderStatus = 2;
          this._retailService.updateOrder(input).subscribe(
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

  ExportExcel(id: string) {
    this.loading = true;
    this._fileService.exportToExcel(id).subscribe((res) => {
      this.loading = false;
    });
  }

}
