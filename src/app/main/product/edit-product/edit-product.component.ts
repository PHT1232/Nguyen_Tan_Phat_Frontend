import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryInput, CategoryServiceProxy, PermissionDto, ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { CategoryProduct, CategoryProductList } from '@shared/service-proxies/dtos/products/CategoryProduct';
import { ProductGetAllDto } from '@shared/service-proxies/dtos/products/ProductGetAllDto';
import { ProductInputDto } from '@shared/service-proxies/dtos/products/ProductInputDto';
import { ProductOutputDto } from '@shared/service-proxies/dtos/products/ProductOutputDto';
import { ProductStorageDto } from '@shared/service-proxies/dtos/products/ProductStorageDto';
import { StorageProductDetail, StorageProductDetailList } from '@shared/service-proxies/dtos/products/StorageProductDetail';
import { SubcategoryProduct, SubcategoryProductList } from '@shared/service-proxies/dtos/products/SubcategoryProduct';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponent } from '@app/app.component';
import { AppConsts } from '@shared/AppConsts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  animations: [appModuleAnimation()]
})
export class EditProductComponent extends AppComponentBase implements OnInit {
  id: string;
  saving = false;
  categoryCode: CategoryProduct = new CategoryProduct();
  subcategoryCode: SubcategoryProduct = new SubcategoryProduct();
  productList: ProductGetAllDto[] = [];
  getStorage: StorageProductDetailList = new StorageProductDetailList();
  getCategory: CategoryProductList = new CategoryProductList();
  getSubcategorycode: SubcategoryProductList = new SubcategoryProductList();
  isCategoryCodeExist = false;
  totalCount: number;
  storageFormArray = new FormArray([]);
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  products = new ProductOutputDto();
  storageSelect: StorageProductDetail[] = [];
  quantity: number;
  location: string;
  isTrue = true;
  isExist = false;
  files: File[] = [];
  errorMessage = 'Không được trùng kho';

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private http: HttpClient,
    private router: ActivatedRoute,
    private _router: Router,
    private appMain: AppComponent
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this._productService.getStorageProduct().subscribe(val => {
      this.getStorage = val;
    });

    this._productService.getCategoryProduct().subscribe(val => {
      this.getCategory = val;
    });
    this.products.storages = [];
    this.products.subCategoryId = '0';
    this.router.params.subscribe(params => {
      this.id = params['id']
    });
    
    this._productService.getProduct(this.id.toString())
      .subscribe((result: ProductOutputDto) => {
        this.products.productCode = result.productCode;
        this.products.productName = result.productName;
        this.products.productDescription = result.productDescription;
        this.products.productDetail = result.productDetail;
        this.products.price = result.price;
        this.products.unit = result.unit;
        this.getCategory.items.forEach(element => {
          if (result.categoryId == element.code) {
            this.categoryCode = new CategoryProduct({
              code: element.code,
              name: element.name
            });
          }
        });

        this._productService.getSubcategoryProduct(result.categoryId).subscribe(val => {
          if (val.items === undefined) {
          //   this.products.subCategoryId = '0';
            this.isCategoryCodeExist = false;
          } else {
          //   this.products.subCategoryId = '0';
            this.isCategoryCodeExist = true;
          }
          this.getSubcategorycode = val;

          this.getSubcategorycode.items.forEach(element => {
            if (result.subCategoryId == element.code.toString()) {
              this.subcategoryCode = new SubcategoryProduct({
                code: element.code,
                name: element.name
              });
            }
          });
        });
        const path = AppConsts.remoteServiceBaseUrl + '\\Upload\\Product\\' + result.productImage;

        this._productService.getSubcategoryProduct(result.categoryId).subscribe(val => {
          this.getSubcategorycode = val;
        });
        if (result.subCategoryId === null) {
          this.products.subCategoryId = '0';
        } else {
          this.products.subCategoryId = result.subCategoryId;
        }
        // this.products.storages = result.storages;
        
        // this.http.get(path,
        //   { responseType: 'blob' }).subscribe((res) => {
        //     const fileDto = new File([res], result.productImage);
        //     this.files.push(fileDto);
        //   });
      });
      
  }

  save(): void {
    this.saving = true;

    const product = new ProductInputDto();
    product.productCode = this.products.productCode;
    const formData = new FormData();

    var URL = AppConsts.remoteServiceBaseUrl + '/api/Upload/ProductUpload';

    for (const file of this.files) {
      formData.append('file', file);
      URL += "?id=" + this.products.productCode;
    }

    this.http.post(URL, formData).subscribe((res) => {
      product.productName = this.products.productName;
      var tenFile;
        for (const file of this.files) {
          // const a = res['result'][res['result']
          //   .findIndex(e => e.includes(file.name))].split('/');
          tenFile = file.name;
      }
      product.productDescription = this.products.productDescription;
      product.productImage = product.productCode + "/" + tenFile;
      product.productDetail = this.products.productDetail;
      product.categoryId = this.categoryCode.code;
      product.unit = this.products.unit;
      product.price = this.products.price;  
      if (this.products.subCategoryId === '0')
        product.subCategoryId = null;
      else
        product.subCategoryId = this.products.subCategoryId;
      
      product.storages = this.storageSelect;
      this._productService.update(product).subscribe(
        () => {
          this.appMain.showSuccessMessage('Cập nhật thành công', 'Cập nhật sản phẩm thành công');
          this.onSave.emit();
          this._router.navigate(['app/product']);
        },
        () => {
          this.saving = false;
        }
      )
    });
  }

  getSubcategory() {
    if (this.categoryCode !== undefined) {
      this._productService.getSubcategoryProduct(this.categoryCode.code).subscribe(val => {
        // if (val.length === 0) {
        //   this.products.subCategoryId = '0';
        //   this.isCategoryCodeExist = false;
        // } else {
        //   this.products.subCategoryId = '0';
        //   this.isCategoryCodeExist = true;
        // }
        this.getSubcategorycode = val;
      });
      return;
    }
    this.products.subCategoryId = '0';
    this.isCategoryCodeExist = false;
  }

  Cancel(): void {
    this._router.navigate(['app/product']);
  }

  RemoveItem(index: number) {
    this.storageFormArray.removeAt(index);
    if (this.storageFormArray.length === 0) {
      this.storageSelect = [];  
    } else {
      this.storageSelect.slice(index);
    }
  }

  checkFormValid(): boolean {
    if (this.products.productCode === undefined 
      || this.products.productName === undefined 
      || this.products.price === undefined 
      // || this.storageSelect.length === 0
      || this.categoryCode === undefined 
      || this.products.unit === ''
      || this.isExist
      || this.products.productCode === '' 
      || this.products.productName === '') {
      return true;
    }

    if (this.getSubcategorycode.items === undefined || this.getSubcategorycode.items.length > 0 && this.products.subCategoryId === '0') {
      return true;
    }

    // this.storageSelect.forEach(element => {
    //   if (element.storageCode === undefined || element.quantity === undefined || element.productLocation === undefined) {
    //     this.isTrue = true;
    //   }
    // });
    if (this.isTrue) {
      this.isTrue = false
      return true;
    }
  }

  checkIfAlreadyExist(storageCode: string, index: number) {
    var isForeach = false;
    if (this.storageFormArray.length > 1) {
      this.storageSelect.forEach((element, indexElement) => {
        if (element.storageCode === storageCode && indexElement !== index) {
          isForeach = true;
          this.isExist = true;
        }
      });
      if (!isForeach) {
        this.isExist = false;
      }
    }
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
