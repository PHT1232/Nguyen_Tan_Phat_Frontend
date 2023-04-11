import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { GetAllStorageDto, GetAllStoragePagedResultDto, StorageServiceProxy } from '@shared/service-proxies/service-proxies';
import { throwError } from 'rxjs';
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

  constructor(
    injector: Injector,
    private _storageService: StorageServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
  }

  list(request: PagedStorageRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;

    this._storageService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: GetAllStoragePagedResultDto) => {
        this.storages = result.items;
        this.showPaging(result, pageNumber);
      });
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
