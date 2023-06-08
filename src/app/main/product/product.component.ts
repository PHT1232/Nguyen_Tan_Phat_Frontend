import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CategoryInput, CategoryServiceProxy, ExportImportProductDto, FileDownloadService, PermissionDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { CategoryProduct, CategoryProductList } from '@shared/service-proxies/dtos/products/CategoryProduct';
import { ProductGetAllDto } from '@shared/service-proxies/dtos/products/ProductGetAllDto';
import { ProductInputDto } from '@shared/service-proxies/dtos/products/ProductInputDto';
import { ProductOutputDto } from '@shared/service-proxies/dtos/products/ProductOutputDto';
import { ProductStorageDto } from '@shared/service-proxies/dtos/products/ProductStorageDto';
import { StorageProductDetail, StorageProductDetailList } from '@shared/service-proxies/dtos/products/StorageProductDetail';
import { ProductGetAllPagedResultDto } from '@shared/service-proxies/dtos/products/ProductGetAllPagedResultDto';
import { SubcategoryProduct, SubcategoryProductList } from '@shared/service-proxies/dtos/products/SubcategoryProduct';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { AppComponent } from '@app/app.component';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LookUpTable } from '@shared/service-proxies/dtos/LookUpTable';
import { BaoGiaObject } from '@shared/service-proxies/dtos/BaoGiaObject';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string;
  storageCode: string;
  categoryCode: string;
  subcategoryCode: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [appModuleAnimation()]
})
export class ProductComponent extends PagedListingComponentBase<ProductGetAllDto> {
  keyword = '';
  storageCode = new LookUpTable();
  categoryCode: CategoryProduct = new CategoryProduct();
  subcategoryCode: SubcategoryProduct = new SubcategoryProduct();
  productList: ProductGetAllDto[] = [];
  getStorage: LookUpTable[];
  getCategory: CategoryProductList = new CategoryProductList();
  getSubcategorycode: SubcategoryProductList = new SubcategoryProductList();
  totalCount: number;
  first: number = 0;
  rows: number = 6;
  selectedProducts: ProductGetAllDto[] = [];
  imageShow:  any;

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private _fileService: FileDownloadService,
    private http: HttpClient,
    private appMain: AppComponent
  ) { 
    super(injector);
    this._productService.getStorageExpense().subscribe((val) => {
      this.getStorage = val.items;
      // this.storageCode = val[val.items.length].storageCode;
    });
  
      this._productService.getCategoryProduct().subscribe(val => {
          this.getCategory = val;
      });
  }

    createImageFromBlob(image: Blob): any {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        return reader.result;
      }, false);
  
      if (image) {
        reader.readAsDataURL(image);
      }
    }

    getImage(imageUrl: string): Observable<Blob> {
      return this.http.get(imageUrl, {responseType: 'blob'});
    }

  list(request: PagedProductRequestDto, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword;

    if (this.storageCode === undefined || this.storageCode === null) {
      request.storageCode = "";
    } else {
      request.storageCode = this.storageCode.code;
    }

    if (this.categoryCode === undefined || this.categoryCode === null) {
      request.categoryCode = "";
    } else {
      request.categoryCode = this.categoryCode.code;
    }
    
    setTimeout(() => { 
      if (this.subcategoryCode === undefined || this.subcategoryCode === null) {
        request.subcategoryCode = undefined; 
      } else {
        request.subcategoryCode = this.subcategoryCode.code; 
      }

      console.log(request.keyword);
      console.log(request.storageCode);
      console.log(request.categoryCode);
      console.log(request.subcategoryCode);
      
      this._productService
      .getAll(request.keyword, request.storageCode, request.categoryCode, request.subcategoryCode, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe(async (result: ProductGetAllPagedResultDto) => {
        this.productList = result.items;
        this.showPaging(result, pageNumber);
        // for (var i = 0; i < this.productList.length; i++) {
        //   var url = 'https://localhost:44311/File/GetImage?fileName=' + this.productList[i].productImage;
        //    await setTimeout(() => {
        //     this.getImage(url).subscribe(data => {
        //       // this.productList[i].imageToShow = this.createImageFromBlob(data);
        //       this.imageShow = this.createImageFromBlob(data);
        //     });
        //    }, 500); 
        // }
      });
    },200);
  }
  delete(entity: ProductGetAllDto): void {
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: 'Sản phẩm sẽ bị xóa',
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
        this._productService.delete(entity.productCode).pipe(
          catchError(err => {
            return throwError(err);
          }))
          .subscribe({
            next: () => {
              this.appMain.showSuccessMessage('Xóa thành công', 'Xóa thành công sản phẩm thành công')
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

  checkOnDelete() {
    // console.log("Selected storage: " + this.selectedStorages.storageCode)
    this.swal.fire({
      title: 'Bạn có chắc?',
      text: this.selectedProducts.length + ' sản phẩm sẽ bị xóa',
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
        var numOfDeleted = 0;
        var numToDelete = this.selectedProducts.length;
        this.selectedProducts.forEach(element => {
          this._productService.delete(element.productCode).pipe(
            catchError(err => {
              return throwError(err);
            }))
            .subscribe({
              next: () => {
                // this.message.add({ severity: 'success', summary: 'Xóa thành công', detail: 'Xóa thành công kho thành công'})
                numOfDeleted += 1;
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
          });
          this.appMain.showSuccessMessage('Xóa thành công', 'Xóa thành công ' + numOfDeleted + '/' + numToDelete + ' kho thành công')
        }
      });
  }

  getSubcategory() {
    if (this.categoryCode !== undefined) {
      this._productService.getSubcategoryProduct(this.categoryCode.code).subscribe(val => {
          this.getSubcategorycode = val
          this.subcategoryCode.code = 0;
      });
    } 
  }

  searched() {
    if (this.keyword !== undefined) {
      if (this.storageCode === undefined) {
        console.log("zero")
      }
      this.categoryCode = undefined;
      this.rows = this.totalItems;
      this.pageSize = this.totalItems;
    }
  }

  getSeverity(status: string) {
    switch (status) {
        case 'Còn hàng':
            return 'success';
        case 'Ít hàng':
            return 'warning';
        case 'Hết hàng':
            return 'danger';
    }
  }

  ExportExcel() {
    var baogia = new BaoGiaObject();
    baogia.customerName = "phat";
    baogia.customerAddress = "phat 2";
    baogia.date = "phat 4";
    var product = "S300GK12"
    baogia.products = [];
    baogia.products.push(product);
    baogia.products.push("S300G-1G/M");
    baogia.products.push("S300GK20A");
    this._fileService.getByte(baogia).subscribe((res) => {
      this._fileService.exportToExcelBaoGia(res)
    });
  }
}
