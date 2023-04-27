import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { StructureInputDto } from '@shared/service-proxies/dtos/Structure/StructureInputDto';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';
import { PermissionDto, StructureServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-structure',
  templateUrl: './create-structure.component.html',
  styleUrls: ['./create-structure.component.css'],
  animations: [appModuleAnimation()]
})
export class CreateStructureComponent extends AppComponentBase implements OnInit {
  saving = false;
  structure = new StructureInputDto();
  getStructure: StructureSelectDto[] = [];
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private _structureService: StructureServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
    })
  }

  ngOnInit(): void {
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
