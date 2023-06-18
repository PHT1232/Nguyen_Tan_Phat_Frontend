import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { catchError, delay, finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { GetAllStorageDto, GetAllStoragePagedResultDto, StorageOutPutDto, StorageServiceProxy } from '@shared/service-proxies/service-proxies';
import { throwError } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { AppComponent } from '@app/app.component';

class PagedStorageRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  animations: [appModuleAnimation()]
})
export class StorageComponent extends PagedListingComponentBase<GetAllStorageDto> {
  keyword = '';
  storages: GetAllStorageDto[] = [];
  totalCount: number;
  first: number = 0;
  rows: number = 6;
  selectedStorages: GetAllStorageDto[] = [];
  storageCodes: string[] = [];
  data: TreeNode[] = [];
  cols: any[];

  constructor(
    injector: Injector,
    private _storageService: StorageServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
    this.cols = [
      { field: "storageCode", header: "Mã kho" },
      { field: "storageName", header: "Tên kho" },
      { field: "unit", header: "Chi nhánh" },
      { field: "address", header: "Địa chỉ" },
      { field: "productQuantity", header: "Số lượng sản phẩm" },
      { field: "creationTime", header: "Ngày tạo" },
      { field: "username", header: "Người cập nhật" }
    ];
  }

  checkOnDelete() {
    // console.log("Selected storage: " + this.selectedStorages.storageCode)
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: this.selectedStorages.length + ' kho sẽ bị xóa',
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
        this.selectedStorages.forEach(element => {
          this.storageCodes.push(element.storageCode);
        });
        this._storageService.deleteMutiple(this.storageCodes).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: (res) => {
              this.message.add({ severity: 'success', summary: 'Xóa thành công', detail: res})
              // abp.notify.success(this.l('Xóa thành công'));
              this.refresh();
              this.selectedStorages = [];
              this.storageCodes = [];
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

  list(request: PagedStorageRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;
    setTimeout(() => {
      this._storageService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: GetAllStoragePagedResultDto) => {
      //   this.cols = [
      //     { field: "storageCode", header: "Mã kho" },
      //     { field: "storageName", header: "Tên kho" },
      //     { field: "unit", header: "Chi nhánh" },
      //     { field: "address", header: "Địa chỉ" },
      //     { field: "creationTime", header: "Ngày tạo" },
      //     { field: "username", header: "Người cập nhật" },
      //   ]
          this.data = [];
          result.items.forEach(element => {
            var childrenStorage = [];
            element.children.forEach(elementChildren => {
              childrenStorage.push({
                data: {
                  storageCode: elementChildren.storageCode,
                  storageName: elementChildren.storageName,
                  unit: elementChildren.unit,
                  address: elementChildren.address,
                  productQuantity: elementChildren.productQuantity,
                  creationTime: elementChildren.creationTime,
                  username: elementChildren.username
                }
              })
            });
            this.data.push({
              data: {
                storageCode: element.storageCode,
                storageName: element.storageName,
                productQuantity: element.productQuantity,
                address: element.address,
              },
              children: childrenStorage
            })
        });
          
          // this.data = [
          //     {
          //         data: {
          //           storageCode: "A",
          //           storageName: "40"
          //         },
          //         children: [
          //             {
          //                 data: {
          //                   storageCode: "B",
          //                   storageName: "16"
          //                 }
          //             },
          //             {
          //                 data: {
          //                     storageCode: "C",
          //                     storageName: "14"
          //                 }
          //             }
          //         ]
          //     },
          // ];
        });

      //   this.showPaging(result, pageNumber);
      // });
      
    }, 500)
  }
  delete(entity: GetAllStorageDto): void {
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: 'kho sẽ bị xóa',
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
        this._storageService.delete(entity.storageCode).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: () => {
              // this.message.add({ severity: 'success', summary: 'Xóa thành công', detail: 'Xóa thành công kho thành công'})
              this.appMain.showSuccessMessage('Xóa thành công', 'Xóa thành công kho thành công')
              // abp.notify.success(this.l('Xóa thành công'));
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
}
