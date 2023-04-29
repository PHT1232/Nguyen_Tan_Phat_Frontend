import { Component, Injector } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { StructureGetallDto } from '@shared/service-proxies/dtos/Structure/StructureGetallDto';
import { StructureGetAllPagedResultDto } from '@shared/service-proxies/dtos/Structure/StructureGetallPagedResultDto';
import { StructureServiceProxy } from '@shared/service-proxies/service-proxies';
import { catchError, finalize, throwError } from 'rxjs';

class PagedStructureRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css'],
  animations: [appModuleAnimation()]
})
export class StructureComponent extends PagedListingComponentBase<StructureGetallDto> {
  keyword = '';
  List: StructureGetallDto[] = [];
  totalCount: number;
  first: number = 0;
  rows: number = 6;
  // selectedProducts: ProductGetAllDto[] = [];

  constructor(
    injector: Injector,
    private _structureService: StructureServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
  }

  list(request: PagedStructureRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;

    setTimeout(() => { 
      console.log(request.keyword);
      
      this._structureService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: StructureGetAllPagedResultDto) => {
        this.List = result.items;
        this.showPaging(result, pageNumber);
      });
    },500);
  }
  delete(entity: StructureGetallDto): void {
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: 'Đơn vị sẽ bị xóa',
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
        this._structureService.delete(entity.unitCode).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: () => {
              this.appMain.showSuccessMessage('Xóa thành công', 'Xóa thành công đơn vị');
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
