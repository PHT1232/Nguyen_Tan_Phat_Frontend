import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Injector,
} from "@angular/core";
import { Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CategoryInput,
  CategoryServiceProxy,
  CustomerDto,
  CustomerListDto,
  EmployeeServiceProxy,
  ExportImportInput,
  ExportImportPagedResult,
  ExportImportProductDto,
  ExportImportService,
  ListOfCustomer,
  PermissionDto,
  ProductServiceProxy,
  StructureServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { LookUpTable, LookUpTableList } from "@shared/service-proxies/dtos/LookUpTable";
import { StorageProductDetailList } from "@shared/service-proxies/dtos/products/StorageProductDetail";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { EmployeeSelectForAccount } from "@shared/service-proxies/dtos/employee/EmployeeSelectForAccount";
import { StructureSelectDto } from "@shared/service-proxies/dtos/Structure/StructureSelectDto";
import { forEach } from "lodash-es";

class PagedProductRequestDto extends PagedRequestDto {
  storageCode: string;
  isInsert: boolean;
}

class InitialProductQuantity {
  id: string;
  quantity: number;
}

@Component({
  selector: "app-create-export-import",
  templateUrl: "./create-export-import.component.html",
  styleUrls: ["./create-export-import.component.css"],
  animations: [appModuleAnimation()],
})
export class CreateExportImportComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  isCollapsed = false;
  exportImport = new ExportImportInput();
  storageCode = new LookUpTable();
  keyword: string;
  // getStorage: StorageProductDetailList = new StorageProductDetailList();
  getStorage: LookUpTable[];
  productsList: ExportImportProductDto[] = [];
  orderType = 1;
  products: ExportImportProductDto[] = [];
  user: LookUpTableList = new LookUpTableList();
  employee: EmployeeSelectForAccount[];
  employeeSelected = new EmployeeSelectForAccount();
  employeeDeliverySelected = new EmployeeSelectForAccount();
  customer: CustomerListDto[];
  customerSelected = new CustomerListDto();
  selectedProducts: ExportImportProductDto[] = [];
  selectedProductsForInput: ExportImportProductDto[] = [];
  selectedDefaultProduct: ExportImportProductDto[] = [];
  customerInput = new CustomerDto();
  request: PagedProductRequestDto;
  pageSize = 10;
  pageNumber = 1;
  totalPages = 1;
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

  @Output() onsave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _exportImport: ExportImportService,
    private _productService: ProductServiceProxy,
    private _structureService: StructureServiceProxy,
    public _employeeService: EmployeeServiceProxy,
  ) {
    super(injector);

    // this._employeeService.getEmployeeForSelect().subscribe((result) => {
    //   this.employee = result.items;
    // });

    this._exportImport.getCustomerSelect().subscribe((result) => {
      this.customer = result.items;
    });
    
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
    })

    // setTimeout(() => {
    //   this._exportImport
    //     .getProduct(this.storageCode.code, false, this.skipCount, this.pageSize)
    //     .subscribe((result: ExportImportPagedResult) => {
    //       this.products = result.items;
    //       this.showPaging(result, this.pageNumber);
    //       for (let i = 0; i < this.products.length; i++) {
    //         this.quantityCheck[i] = true;
    //         let productQuantity = new InitialProductQuantity();
    //         productQuantity.id = this.products[i].productId;
    //         productQuantity.quantity = this.products[i].quantity;
    //         this.initialProductQuantity.push(productQuantity);
    //       }
    //       // this.isTableLoading = false;
    //     });
    // }, 300);

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

    this.exportImport.products.forEach(element => {
        console.log("Storage id: " + element.storageId);
        console.log("Product id: " + element.productId);
        console.log("quantity: " + element.quantity);
    });

    this.exportImport.employeeDelivery = this.employeeDeliverySelected.code;
    this.exportImport.orderCreator = this.employeeSelected.code;
    this.exportImport.customer = this.customerInput;
    this.exportImport.discount = this.customerInput.discount;
    this.exportImport.totalPrice = totalPrice;
    this.exportImport.orderStatus = 1;
    this.exportImport.orderType = 1;
    this._exportImport.create(this.exportImport).subscribe(
      () => {
        this.notify.success(this.l("Tạo đơn thành công"));
        this.onsave.emit();
        this._router.navigate(["app/exportimport"]);
      },
      () => {
        this.saving = false;
      }
    );
  }

  public showPaging(result: ExportImportPagedResult, pageNumber: number): void {
    this.totalPages =
      (result.totalCount - (result.totalCount % this.pageSize)) /
        this.pageSize +
      1;

    this.totalItems = result.totalCount;
    this.pageNumber = pageNumber;
  }

  Cancel(): void {
    this._router.navigate(["app/exportimport"]);
  }

  checkFormValid(): boolean {
    // this.isTrue = true;
    if (
      // this.exportImport.products.length === 0 ||
      this.productsList === undefined ||
      this.productsList.length === 0 ||
      this.exportImport.exportImportCode === "" ||
      this.employeeSelected === null ||
      this.customerSelected === null ||
      this.employeeSelected.code === undefined ||
      this.customerSelected.code === undefined
    ) {
      return true;
    }

    // for (let i = 0; i < this.quantityCheck.length; i++) {
    //   if (this.quantityCheck[i] === false) {
    //     this.isTrue = false;
    //     return false;
    //   }
    // }

    // if (this.isTrue) {
    //   this.isTrue = true;
    // return true;
    // }
  }

  getRandomCode() {
    this._exportImport.getRandomCode().subscribe((val) => {
      this.exportImport.exportImportCode = val;
    });
  }

  getCustomer() {
    this._exportImport.getCustomer(this.customerSelected.code).subscribe(
      (val) => {
        this.customerInput = val;
      },
      (error) => {
        this.customerInput.customerName = "";
        this.customerInput.customerCode = 0;
        this.customerInput.customerPhone = "";
        this.customerInput.customerAdress = "";
      }
    );
  }

  // check(): boolean {
  //   if (this.customer.customerPhone === undefined) {
  //     return false;
  //   }
  //   if (this.customer.customerPhone.trim() === "") {
  //     return false;
  //   }
  //   return true;
  // }

  changeQuantity(productTemp: ExportImportProductDto) {
    this.selectedProducts.forEach((element, index) => {
      if (element.productId === productTemp.productId) {
        this.initialProductQuantity.forEach((element1) => {
          if (element1.id === element.productId) {
            if (productTemp.quantity >= element1.quantity) {
              this.selectedProducts[index].quantity = element1.quantity;
              this.selectedProducts[index].finalPrice =
                element1.quantity * productTemp.price;
            } else {
              this.selectedProducts[index].finalPrice =
                productTemp.quantity * productTemp.price;
            }
          }
        });
      }
    });
  }

  // AddItem(productTemp: ExportImportProductDto, index: number) {
  //   if (this.quantityCheck[index] === false) {
  //     var indexToSlice = 0;
  //     this.exportImport.products.forEach((element, index) => {
  //       if (element.productId === productTemp.productId) {
  //         indexToSlice = index;
  //       }
  //     });
  //     if (this.exportImport.products.length === 1) {
  //       this.exportImport.products = [];
  //     } else {
  //       // delete this.exportImport.products[indexToSlice];
  //       this.exportImport.products.slice(indexToSlice);
  //     }
  //     this.quantityCheck[index] = true;
  //   } else {
  //     this.exportImport.products.push(productTemp);
  //     this.quantityCheck[index] = false;
  //   }
  // }

  getDataPage(page: number) {
    this.exportImport.products = [];
    this.quantityCheck = [];
    this.skipCount = (page - 1) * this.pageSize;
    this._exportImport
      .getProduct(this.keyword, this.storageCode.code, false, this.skipCount, this.pageSize)
      .subscribe((result: ExportImportPagedResult) => {
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
      // console.log(val.items[0]);
    });
    this._employeeService.getEmployeeForSelectWithStructureId(id).subscribe((val) => {
      this.employee = val.items;
    });
    // this._exportImport.getProduct(this.keyword)
  }

  showDialog() {
    this.visible = true;
  }

  closeModal() {
    this.selectedProductsForInput = [];
    this.products = [];
    this.storageCode = undefined
    this.visible = false;
  }

  addProduct() {
    if (this.productsList === undefined) {
      this.productsList = [];
    }
    this.selectedProductsForInput.forEach((res) => {
      res.storageId = this.storageCode.code;
      console.log(res.storageId)
      this.productsList.push(res)
    });
    this.selectedProductsForInput = [];
    // this.selectedProducts = this.selectedProductsForInput;
  }

  deleteProduct(product: ExportImportProductDto) {
    var productToSlice = this.productsList.indexOf(product);
    delete this.productsList[productToSlice];
  }

  deleteAllProduct() {
    delete this.productsList;
  }

  onTableScroll(event) {
    const scrollHeight = event.originalEvent.target.scrollHeight;
    const scrollTop = event.originalEvent.target.scrollTop;
    console.log("scroll hegight " +scrollHeight)
    console.log("scroll top " +scrollTop)
    if (scrollHeight === scrollTop) {
      // Load more data here
      this.onLazyLoad(event);
    }
  }

  onLazyLoad(event) {
    this.isTableLoading = true;
    // Load data here based on the event properties such as event.first and event.rows
    // Update the cars array with the new data
    this._exportImport
      .getProduct(this.keyword, this.storageCode.code, false, 0, event.rows)
      .subscribe((result: ExportImportPagedResult) => {
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
}
