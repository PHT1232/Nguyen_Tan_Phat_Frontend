import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { LookUpTable } from '@shared/service-proxies/dtos/LookUpTable';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';
import { RetailGetAllDto } from '@shared/service-proxies/dtos/retail/RetailGetAllDto';
import { RetailGetAllPagedResultDto } from '@shared/service-proxies/dtos/retail/RetailGetAllPagedResultDto';
import { RetailInputDto } from '@shared/service-proxies/dtos/retail/RetailInputDto';
import { FileDownloadService, ProductServiceProxy, RetailService, StructureServiceProxy, VnPayService } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

class PagedRetailRequestDto extends PagedRequestDto {
  keyword: string;
  structureCode: string;
  dateTime: string[] = [];
  orderStatus: number;
  isDelived: boolean;
}

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.css'],
  animations: [appModuleAnimation()]
})
export class RetailComponent extends PagedListingComponentBase<RetailGetAllDto> {
  retail: RetailGetAllDto[];
  keyword = "";
  orderStatus = 1;
  isDelived = false;
  nameOfReciever = "";
  bsInlineRangeValue: Date[];
  retailList: RetailGetAllDto[] = [];
  // getStorage: StorageProductDetailList = new StorageProductDetailList();
  totalCount: number;
  isLoading = false;
  first: number = 0;
  rows: number = 6;
  loading: boolean = false;
  getStructure: StructureSelectDto[] = [];
  selectedStructure = new StructureSelectDto();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _retailService: RetailService,
    private router: ActivatedRoute,
    private vnpayService: VnPayService,
    private _fileService: FileDownloadService,
    private _structureService: StructureServiceProxy,
    private appMain: AppComponent
  ) {
    super(injector);
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
    })

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
      request.structureCode = this.selectedStructure.code;
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
          request.structureCode,
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

          this.router.queryParams.subscribe(params => {
            var failed = params.failed
            const url = new URL(window.location.href);
            const searchParams = url.searchParams;
            searchParams.delete('failed');

            setTimeout(() => {
              if (failed === 'true') {
                this.appMain.showFailedMessage('Lỗi thanh toán', 'Thanh toán lỗi không thể hoàn thành đơn');
                window.history.replaceState({}, document.title, url);
                params.failed = '';
              } else if (failed === 'false') {
                this.appMain.showSuccessMessage('Thành công', 'Thanh toán thành công và hoàn thành đơn');
                const searchParams = url.searchParams;
                window.history.replaceState({}, document.title, url);
                params.failed = '';
              }
            }, 100);
          });
          
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
    this._fileService.exportToExcel(id, true).subscribe((res) => {
      this.loading = false;
    });
  }

  createLink(id: string) {
    this.vnpayService.createPaymentUrl(id)
  }
}
