import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { LookUpTable, LookUpTableList } from '@shared/service-proxies/dtos/LookUpTable';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';
import { EmployeeSelectForAccount } from '@shared/service-proxies/dtos/employee/EmployeeSelectForAccount';
import { RetailCustomerDto } from '@shared/service-proxies/dtos/retail/RetailCustomerDto';
import { RetailInputDto } from '@shared/service-proxies/dtos/retail/RetailInputDto';
import { RetailProductDto } from '@shared/service-proxies/dtos/retail/RetailProductDto';
import { RetailPagedResult } from '@shared/service-proxies/dtos/retail/RetailPagedResult';
import { CustomerDto, CustomerListDto, EmployeeServiceProxy, ExportImportPagedResult, ExportImportService, ProductServiceProxy, RetailService, StructureServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponent } from '@app/app.component';

class PagedProductRequestDto extends PagedRequestDto {
  storageCode: string;
  isInsert: boolean;
}

class InitialProductQuantity {
  id: string;
  quantity: number;
}

interface DropDownVarible {
  name: string;
  code: string;
}

@Component({
  selector: 'app-create-retail',
  templateUrl: './create-retail.component.html',
  styleUrls: ['./create-retail.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateRetailComponent extends AppComponentBase implements OnInit{
  saving = false;
  isCollapsed = false;
  exportImport = new RetailInputDto();
  storageCode = new LookUpTable();
  keyword: string;
  // getStorage: StorageProductDetailList = new StorageProductDetailList();
  getStorage: LookUpTable[];
  productsList: RetailProductDto[] = [];
  orderType = 1;
  products: RetailProductDto[] = [];
  user: LookUpTableList = new LookUpTableList();
  employee: EmployeeSelectForAccount[];
  employeeSelected = new EmployeeSelectForAccount();
  employeeDeliverySelected = new EmployeeSelectForAccount();
  customer: CustomerListDto[];
  customerSelected = new CustomerListDto();
  selectedProducts: RetailProductDto[] = [];
  selectedProductsForInput: RetailProductDto[] = [];
  selectedDefaultProduct: RetailProductDto[] = [];
  customerInput = new RetailCustomerDto();
  request: PagedProductRequestDto;
  pageSize = 10;
  pageNumber = 1;
  first: number = 0;
  rows: number = 10;
  int = 0;
  skipCount = (1 - 1) * this.pageSize;
  isTrue = true;
  quantityCheck: boolean[] = [];
  totalItems: number;
  initialProductQuantity: InitialProductQuantity[] = [];
  isTableLoading = false;
  getStructure: StructureSelectDto[] = [];
  selectedStructure = new StructureSelectDto();
  visible = false;
  dropDownValues: DropDownVarible[];
  selectedDropDownValues: DropDownVarible;
  phuongThucThanhToan: DropDownVarible[];
  selectedPhuongThuc: DropDownVarible;


  @Output() onsave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _exportImport: ExportImportService,
    private _productService: ProductServiceProxy,
    private _structureService: StructureServiceProxy,
    public _employeeService: EmployeeServiceProxy,
    private appMain: AppComponent,
    private _retailService: RetailService,
  ) {
    super(injector);

    // this._employeeService.getEmployeeForSelect().subscribe((result) => {
    //   this.employee = result.items;
    // });

    // this._exportImport.getCustomerSelect().subscribe((result) => {
    //   this.customer = result.items;
    // });
    
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
    })

    this.dropDownValues = [
      { name: 'Trực tiếp', code: 'TT' },
      { name: 'Giao về', code: 'GV' }
    ];    
    
    this.phuongThucThanhToan = [
      { name: 'Tiền mặt', code: 'TM' },
      { name: 'VNPAY', code: 'VNP' }
    ];

    this._exportImport.getUser().subscribe((val) => {
      this.user = val;
    });

    this.exportImport.products = [];
    this.exportImport.orderCreator = "";
  }

  ngOnInit(): void {}

  save(): void {
    let totalPrice = 0;
    this.saving = true;
    this.isTableLoading = true;
    // this.exportImport.customer = this.customer;
    this.exportImport.structureId = this.selectedStructure.code;
    // this.exportImport.products.forEach((element) => {
    //   totalPrice += element.finalPrice;
    
    // });
    this.productsList.forEach(element => {
      // console.log("quantity: " + element.quantity);
      // console.log("finalprice: " + element.finalPrice);
      element.finalPrice = element.quantity * element.price;
      totalPrice += element.finalPrice;
      this.exportImport.products.push(element);  
    });

    // this.exportImport.products.forEach(element => {
    //     console.log("Storage id: " + element.storageId);
    //     console.log("Product id: " + element.productId);
    //     console.log("quantity: " + element.quantity);
    // });

    if (this.selectedPhuongThuc.code === 'VNP') {
      this.exportImport.paymentMethod = 2;
    } else if (this.selectedPhuongThuc.code === 'TM') {
      this.exportImport.paymentMethod = 1;
    }

    this.exportImport.orderCreator = this.employeeSelected.code;
    this.exportImport.customer = this.customerInput;
    this.exportImport.customer.customerCode = this.customerInput.phoneToCall;
    this.exportImport.discount = this.customerInput.discount;
    this.exportImport.totalPrice = totalPrice;
    this.exportImport.orderStatus = 1;
    console.log("VN pay" + this.exportImport.paymentMethod)
    this._retailService.create(this.exportImport).subscribe(
      () => {
        // this.notify.success(this.l("Tạo đơn thành công"));
        
        this.appMain.showSuccessMessage('Thành công', 'Tạo đơn thành công');
        this.onsave.emit();
        this._router.navigate(["app/retail"]);
      },
      () => {
        this.saving = false;
        this.isTableLoading = true;
      }
    );
  }

  public showPaging(result: RetailPagedResult, pageNumber: number): void {
    this.totalItems = result.totalCount;
    this.pageNumber = pageNumber;
  }

  Cancel(): void {
    this._router.navigate(["app/retail"]);
  }

  checkFormValid(): boolean {
    if (
      this.productsList === undefined ||
      this.productsList.length === 0 ||
      this.exportImport.retailCode === "" ||
      this.employeeSelected === null ||
      this.employeeSelected.code === undefined ||
      this.customerInput.phoneToCall === undefined ||
      this.customerInput.phoneToCall === "" || 
      this.customerInput.customerName === undefined || 
      this.customerInput.customerName === "" 
    ) {
      return true;
    }
  }

  getRandomCode() {
    this._exportImport.getRandomCode().subscribe((val) => {
      this.exportImport.retailCode = val;
    });
  }

  getCustomer() {
    this._retailService.getCustomer(this.customerInput.phoneToCall).subscribe(
      (val) => {
        this.customerInput = val;
      },
      (error) => {
        this.customerInput.customerName = "";
        this.customerInput.customerCode = "";
        this.customerInput.reveciveAddress = "";
      }
    );
  }

  getDataPage(event) {
    this.exportImport.products = [];
    this.quantityCheck = [];
    console.log("page " + event.page);
    this.skipCount = event.page * this.pageSize;
    this._retailService
      .getProduct(this.keyword, this.selectedStructure.code, this.skipCount, this.pageSize)
      .subscribe((result: RetailPagedResult) => {
        // this.products = result.items;
        this.products = [];
        if (this.selectedProductsForInput.length !== 0) {
          result.items.forEach(element => {
            this.selectedProductsForInput.forEach(elementProduct => {
              if (element.productId === elementProduct.productId) {
                element.quantity = elementProduct.quantity;
              }
            });
            this.products.push(element);
          });
        } else {
          this.products = result.items;
        }
        
        this.showPaging(result, this.pageNumber);
        for (let i = 0; i < this.products.length; i++) {
          this.quantityCheck[i] = true;
        }
      });
  }

  isProductSelected(data) {
    return this.selectedProducts.indexOf(data) > -1
  }

  isProductSelectedInput(data) {
    if (this.selectedProductsForInput.length === 0) {
      return false;
    }

    var hasThing = false;
    this.selectedProductsForInput.forEach(element => {
      if (element.productId === data.productId) {
        hasThing = true;
        return;
      }
    });
    return hasThing;
  }

  getStorageAndEmployeeClick(id: string) {
    this._exportImport.getStorage(id).subscribe((val) => {
      this.getStorage = val.items;
    });
    this._retailService
      .getProduct(this.keyword, id, this.skipCount, this.pageSize)
      .subscribe((result: RetailPagedResult) => {
        this.products = [];
        this.initialProductQuantity = []; 
        this.products = result.items;
        result.items.forEach(element => {
          var initialProduct = new InitialProductQuantity();
          initialProduct.id = element.productId;
          initialProduct.quantity = element.quantity;
          this.initialProductQuantity.push(initialProduct);
        });
        
        this.showPaging(result, this.pageNumber);
        for (let i = 0; i < this.products.length; i++) {
          this.quantityCheck[i] = true;
        }
      });
    this._employeeService.getEmployeeForSelectWithStructureId(id).subscribe((val) => {
      this.employee = val.items;
    })
  }

  showDialog() {
    if (this.products.length <= 0) {
      this.isTableLoading = true;
      this._retailService
      .getProduct(this.keyword, this.selectedStructure.code, this.skipCount, this.pageSize)
      .subscribe((result: RetailPagedResult) => {
        // this.products = result.items;
        this.products = [];
        if (this.productsList.length !== 0) {
          result.items.forEach(element => {
            var elementInput = this.productsList.find(e => e.productId == element.productId && e.storageId == element.storageId);
            if (elementInput !== undefined) {
              element.quantity = element.quantity - elementInput.quantity;
            }
            this.products.push(element);
          });
        } else {
          this.products = result.items;
        }
        this.isTableLoading = false;
        this.showPaging(result, this.pageNumber);
        for (let i = 0; i < this.products.length; i++) {
          this.quantityCheck[i] = true;
        }
      });
    }

    this.visible = true;
  }

  closeModal() {
    this.selectedProductsForInput = [];
    this.products = [];
    this.storageCode = undefined;
    this.visible = false;
    // this.getStorageAndEmployeeClick(this.selectedStructure.code);
  }

  addProduct() {
    if (this.productsList === undefined) {
      this.productsList = [];
    }
    // this.selectedProductsForInput.forEach((res) => {
    //   res.storageId = this.selectedStructure.code;
    //   console.log(res.storageId)
    //   this.productsList.push(res)
    // });

    this.selectedProductsForInput.forEach((res) => {
      var index = this.productsList.findIndex(e => e.productId == res.productId && e.storageId == this.selectedStructure.code);
      res.storageId = this.selectedStructure.code;
      
      if (index > -1) {
        this.productsList[index].quantity += res.quantity;
      } else {
        this.productsList.push(res);
      }
    });


    this.selectedProductsForInput = [];
    // this.selectedProducts = this.selectedProductsForInput;
  }

  deleteProduct(product: RetailProductDto) {
    var productToSlice = this.productsList.indexOf(product);
    delete this.productsList[productToSlice];
  }

  deleteAllProduct() {
    delete this.productsList;
  }
}
