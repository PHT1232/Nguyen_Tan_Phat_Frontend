import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoryInput, CategoryServiceProxy, PermissionDto, ProductServiceProxy, UploadServiceProxy } from '@shared/service-proxies/service-proxies';
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

var URL = AppConsts.remoteServiceBaseUrl + '/api/Upload/ProductUpload';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateProductComponent extends AppComponentBase implements OnInit {
  saving = false;
  categoryCode = '0';
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
  products = new ProductInputDto();
  storageSelect: StorageProductDetail[] = [];
  quantity: number;
  location: string;
  isTrue = true;
  isExist = false;
  errorMessage = 'Không được trùng kho';
  files: File[] = [];
  filePath = ""

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productService: ProductServiceProxy,
    private http: HttpClient,
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
        console.log(val.items[0]);
        this.getCategory = val;
    });
    this.products.storages = [];
    this.products.subCategoryId = '0';
  }

  save(): void {
    this.saving = true;

    const product = new ProductInputDto();
    product.productCode = this.products.productCode;
    const formData = new FormData();
    for (const file of this.files) {
      formData.append('file', file);
      URL += "?id=" + this.products.productCode;
    }
    this.http.post(URL, formData).subscribe((res) => {
      this.filePath = res['result'][0];
      product.productImage = this.filePath;
        product.productName = this.products.productName;
        product.productDescription = this.products.productDescription;
        product.productDetail = this.products.productDetail;
        product.categoryId = this.categoryCode;
        product.unit = this.products.unit;
        product.price = this.products.price;  
        if (this.products.subCategoryId === '0') {
          product.subCategoryId = null;
        } else {
          product.subCategoryId = this.products.subCategoryId;
        }
        
        product.storages = this.storageSelect;

         this._productService.create(product).subscribe(
          () => {
            this.appMain.showSuccessMessage('Thêm mới thành công', 'Thêm mới sản phẩm thành công')
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
    if (this.categoryCode !== '0') {
      this._productService.getSubcategoryProduct(this.categoryCode).subscribe(val => {
        if (val.items.length === 0) {
          this.products.subCategoryId = '0';
          this.isCategoryCodeExist = false;
        } else {
          this.products.subCategoryId = '0';
          this.isCategoryCodeExist = true;
        }
        this.getSubcategorycode = val;
      });
      return;
    }
    this.products.subCategoryId = '0';
    this.isCategoryCodeExist = false;
  }

  AddItem() {
    if (this.storageFormArray.length < this.getStorage.items.length) {
      this.storageSelect[this.storageFormArray.length] = new StorageProductDetail();
      this.storageFormArray.push(new FormGroup({
        storageOfFormArray: new FormControl(''),
        quantity: new FormControl(''),
        location: new FormControl(''),
      }));
    }
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
    // if (this.products.productCode === undefined 
    //   || this.products.productName === undefined 
    //   || this.products.price === undefined 
    //   || this.products.unit === undefined
    //   || this.files.length === 0
    //   // || this.storageSelect.length === 0
    //   || this.categoryCode === '0' 
    //   || this.products.unit === ''
    //   || this.products.productCode === ''
    //   || this.isExist 
    //   || this.products.productName === '') {
    //     console.log("1 check form valid");
    //     return true;
    // }

    // if (this.getSubcategorycode.items.length > 0 && this.products.subCategoryId === '0') {
    //   console.log("2 check form valid");
    //   return true;
    // }

    // this.storageSelect.forEach(element => {
    //   if (element.storageCode === undefined || element.quantity === undefined || element.productLocation === undefined) {
    //     console.log("3 check form valid");
    //     this.isTrue = true;
    //   }
    // });

    // this.storageFormArray.controls.forEach((element, index) => {
    //   if (this.storageSelect[index].storageCode === undefined || this.storageSelect[index].quantity === undefined || this.storageSelect[index].productLocation === undefined) {
    //     console.log("3 check form valid");
    //     this.isTrue = true;
    //   }
    // });

    return false
    // if (this.isTrue) {
    //   this.isTrue = false
    //   console.log("4 check form valid");
    //   return true;
    // }
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
