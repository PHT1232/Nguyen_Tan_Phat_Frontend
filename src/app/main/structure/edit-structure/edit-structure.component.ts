import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { StructureInputDto } from '@shared/service-proxies/dtos/Structure/StructureInputDto';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';
import { PermissionDto, StructureServiceProxy } from '@shared/service-proxies/service-proxies';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-edit-structure',
  templateUrl: './edit-structure.component.html',
  styleUrls: ['./edit-structure.component.css'],
  animations: [appModuleAnimation()]
})
export class EditStructureComponent extends AppComponentBase implements OnInit {
  saving = false;
  structure = new StructureInputDto();
  getStructure: StructureSelectDto[] = [];
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  structureSelected = new StructureSelectDto();
  defaultPermissionCheckedStatus = true;
  id: string;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _structureService: StructureServiceProxy,
    private appMain: AppComponent,
    private router: ActivatedRoute,
  ) { 
    super(injector);
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
      this.getStructure.push(new StructureSelectDto({code: "0", name: "CÔNG TY CỔ PHẦN UNTEN"}))
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id']
    });
    this._structureService.get(this.id).subscribe(val => {
        this.structure.unitCode = val.unitCode;
        this.structure.unitName = val.unitName;
        this.structure.address = val.address;
        this.structure.businessRN = val.businessRN;
        this.structure.levelOfUnit = val.levelOfUnit;
        this.structure.unitOf = val.unitOf;
        this.getStructure.forEach(element => {
          if (element.code === val.unitOf) {
            this.structureSelected = new StructureSelectDto({code: element.code, name: element.name});
          }
        });
        let formattedDate = formatDate(val.issuedDate, 'yyyy-MM-dd', 'en_US')
        this.structure.issuedDate = new Date(formattedDate);
        this.structure.issuedPlace = val.issuedPlace;
    });
  }

  save(): void {
    this.saving = true;
    const structureAdd = new StructureInputDto();
    structureAdd.init(this.structure);

    console.log(this.structure.unitCode)

    this._structureService.createStructure(structureAdd).subscribe(
      () => {
        this.appMain.showSuccessMessage('Thêm mới thành công', 'Thêm mới đơn vị thành công')
        this.onSave.emit();
        this._router.navigate(['app/structure']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  Cancel(): void {
    this._router.navigate(['app/structure']);
  }

  checkFormValid(): boolean {
    if (this.structure.unitCode === undefined 
      || this.structure.unitName === undefined 
      || this.structure.unitOf === undefined 
      || this.structure.levelOfUnit === undefined 
      // || this.storageSelect.length === 0
      || this.structure.address === ''
      || this.structure.businessRN === undefined
      || this.structure.issuedDate === undefined
      || this.structure.issuedPlace === undefined
      ) {
        console.log("1 check form valid");
        return true;
    }
  }
}
