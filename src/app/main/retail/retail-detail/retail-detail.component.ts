import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedRequestDto } from '@shared/paged-listing-component-base';
import { LookUpTableList } from '@shared/service-proxies/dtos/LookUpTable';
import { RetailOutputDto } from '@shared/service-proxies/dtos/retail/RetailOutputDto';
import { RetailProductDto } from '@shared/service-proxies/dtos/retail/RetailProductDto';
import { CustomerDto, EmployeeServiceProxy, ExportImportService, FileDownloadService, ProductServiceProxy, RetailService, StructureServiceProxy, VnPayService } from '@shared/service-proxies/service-proxies';

class PagedProductRequestDto extends PagedRequestDto {
  storageCode: string;
  isInsert: boolean;
}

@Component({
  selector: 'app-retail-detail',
  templateUrl: './retail-detail.component.html',
  styleUrls: ['./retail-detail.component.css']
})
export class RetailDetailComponent extends AppComponentBase implements OnInit {

  saving = false;
  isCollapsed = false;
  exportImport = new RetailOutputDto();
  storageCode = '';
  keyword: string;
  orderType = 1;
  products: RetailProductDto[] = [];
  user: LookUpTableList = new LookUpTableList();
  customer = new CustomerDto();
  request: PagedProductRequestDto;
  pageSize = 5;
  pageNumber = 1;
  totalPages = 1;
  skipCount = (1 - 1) * this.pageSize;
  isTrue = true;
  quantityCheck: boolean[] = [];
  totalItems: number;
  id: string;
  isTableLoading = false;
  loading: boolean = false
  
  @Output() onsave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _exportImport: ExportImportService,
    private _productService: ProductServiceProxy,
    private _structureService: StructureServiceProxy,
    private router: ActivatedRoute,
    private vnpayService: VnPayService,
    public _employeeService: EmployeeServiceProxy,
    private _fileService: FileDownloadService,
    private appMain: AppComponent,
    private _retailService: RetailService,
  ) {
    super(injector);

    this.router.params.subscribe(params => {
      this.id = params['id']
    });

    setTimeout(() => {
      this._retailService.get(this.id).subscribe((result: RetailOutputDto) => {
        this.exportImport.retailCode = result.retailCode;
        this.exportImport.orderCreator = result.orderCreator;
        this.exportImport.orderStatus = result.orderStatus;
        this.customer = result.customer;
        this.products = result.products;
        this.exportImport.discount = result.discount;
        this.exportImport.customer = result.customer;
        this.exportImport.totalPrice = result.totalPrice;
      });
    }, 300);

    
    this._exportImport.getUser()
    .subscribe(val => {
      this.user = val;
    });
  }

  ngOnInit(): void {
  }

  Cancel(): void {
    this._router.navigate(['app/retail']);
  }

  ExportExcel(id: string) {
    this.loading = true;
    this._fileService.exportToExcel(id, false).subscribe((res) => {
      this.loading = false;
    });
  }

  ExportExcelXuat(id: string) {
    this._fileService.exportToExcelDelivery(id, false).subscribe((res) => {
      this.loading = false;
    });
  }

  createLink(id: string) {
    this.vnpayService.createPaymentUrl(id)
  }
}