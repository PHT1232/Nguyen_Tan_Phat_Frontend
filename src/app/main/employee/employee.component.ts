import { Component, Injector } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { EmployeeGetAllDto } from '@shared/service-proxies/dtos/employee/EmployeeGetallDto';
import { EmployeeGetAllPagedResultDto } from '@shared/service-proxies/dtos/employee/EmployeeGetallPagedResultDto';
import { EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { catchError, finalize, throwError } from 'rxjs';

class PagedEmployeeRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent extends PagedListingComponentBase<EmployeeGetAllDto> {
  keyword = '';
  List: EmployeeGetAllDto[] = [];
  listToDelete: EmployeeGetAllDto[] = [];
  employeeCodes: string[] = [];
  totalCount: number;
  first: number = 0;
  rows: number = 6;
  // selectedProducts: ProductGetAllDto[] = [];

  constructor(
    injector: Injector,
    private _employeeService: EmployeeServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
  }

  list(request: PagedEmployeeRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;

    setTimeout(() => { 
      console.log(request.keyword);
      
      this._employeeService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: EmployeeGetAllPagedResultDto) => {
        this.List = result.items;
        this.showPaging(result, pageNumber);
      });
    },500);
  }
  delete(entity: EmployeeGetAllDto): void {
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: 'Nhân viên sẽ bị xóa',
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
        this._employeeService.delete(entity.employeeCode).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: () => {
              this.appMain.showSuccessMessage('Xóa thành công', 'Xóa thành công nhân viên');
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

  DeleteMultiple() {
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: this.listToDelete.length + ' nhân viên sẽ bị xóa',
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
        this.listToDelete.forEach(element => {
          this.employeeCodes.push(element.employeeCode);
        });
        this.employeeCodes.forEach(element => {
          console.log(element)
        });
        this._employeeService.deleteMutiple(this.employeeCodes).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: (res) => {
              this.appMain.showSuccessMessage("Xóa thành công", "Xóa thành công " + this.listToDelete.length + "/" + this.listToDelete.length + " nhân viên")
              // abp.notify.success(this.l('Xóa thành công'));
              this.refresh();
              this.listToDelete = [];
              this.employeeCodes = [];
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
