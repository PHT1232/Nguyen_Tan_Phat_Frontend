import { Component, Injector, OnInit } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  ExportImportInput,
  ExportImportPagedResult,
  ExportImportService,
  FileDownloadService,
  GetAllExportImportDto,
  GetAllExportImportPagedResult,
  ProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { ProductGetAllDto } from '@shared/service-proxies/dtos/products/ProductGetAllDto';
import { StorageProductDetail, StorageProductDetailList } from '@shared/service-proxies/dtos/products/StorageProductDetail';
import { throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { AppComponent } from "@app/app.component";
import * as moment from "moment";
import { Console } from "console";
import { LookUpTable } from "@shared/service-proxies/dtos/LookUpTable";

class PagedExportImportRequestDto extends PagedRequestDto {
  keyword: string;
  storageCode: string;
  dateTime: string[] = [];
  orderStatus: number;
}

@Component({
  selector: "app-export-import",
  templateUrl: "./export-import.component.html",
  styleUrls: ["./export-import.component.css"],
  animations: [appModuleAnimation()],
})
export class ExportImportComponent extends PagedListingComponentBase<GetAllExportImportDto> {
  exportImports: GetAllExportImportDto[];
  keyword = "";
  storageCode = new LookUpTable();
  orderStatus = 1;
  nameOfReciever = "";
  bsInlineRangeValue: Date[];
  exportImportList: GetAllExportImportDto[] = [];
  // getStorage: StorageProductDetailList = new StorageProductDetailList();
  getStorage: LookUpTable[];
  totalCount: number;
  isLoading = false;
  first: number = 0;
  rows: number = 10;
  loading: boolean = false;

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _exportImportService: ExportImportService,
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
    request: PagedExportImportRequestDto,
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
      
      console.log(request.maxResultCount);
      this._exportImportService
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
        .subscribe((result: GetAllExportImportPagedResult) => {
          this.exportImportList = result.items;
          this.showPaging(result, pageNumber);
          this.isLoading = false;
        });
    }, 500);
  }
  delete(entity: GetAllExportImportDto): void {
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
          let input = new ExportImportInput();
          input.exportImportCode = entity.exportImportCode;
          input.orderStatus = 3;
          this._exportImportService.updateOrder(input).subscribe(
            () => {
              this.appMain.showSuccessMessage('Cập nhật thành công', 'Hủy đơn thành công');
              this.refresh();
            },
            () => {}
          );
        }
      });
  }

  finishOrder(entity: GetAllExportImportDto): void {
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
          let input = new ExportImportInput();
          input.exportImportCode = entity.exportImportCode;
          input.orderStatus = 2;
          this._exportImportService.updateOrder(input).subscribe(
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
    this._fileService.exportToExcelDelivery(id, false).subscribe((res) => {
      this.loading = false;
    });
    setTimeout(() => {
      this._fileService.exportToExcel(id, false).subscribe((res) => {
        this.loading = false;
      });
    }, 300);
    
  }
}
