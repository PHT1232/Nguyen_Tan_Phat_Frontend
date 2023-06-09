import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { PermissionDto, StorageForUpdate, StorageInput, StorageServiceProxy, StructureServiceProxy } from '@shared/service-proxies/service-proxies';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { StructureSelectDto } from '@shared/service-proxies/dtos/Structure/StructureSelectDto';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.css'],
  animations: [appModuleAnimation()]
})
export class EditStorageComponent extends AppComponentBase implements OnInit {
  saving = false;
  id: number;
  storage = new StorageInput();
  permissions: PermissionDto[] = [];
  checkedPermissionMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;
  getStructure: StructureSelectDto[] = [];
  selectedStructure = new StructureSelectDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _router: Router,
    private router: ActivatedRoute,
    private _storageService: StorageServiceProxy,
    private _structureService: StructureServiceProxy,
    private appMain: AppComponent
  ) 
  { 
    super(injector);
    this._structureService.getStructureSelect().subscribe(val => {
      this.getStructure = val.items;
    })
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = params['id']
    });
    this._storageService.getStorageForEdit(this.id.toString())
    .subscribe((result: StorageForUpdate) => {
      this.storage.storageCode = result.storageCode;
      this.storage.storageName = result.storageName;
      this.storage.structureId = result.structureId;
      // this.selectedStructure = new StructureSelectDto({ code: result., name: result.storageName});
      this.storage.address = result.address;
      this.storage.description = result.description;
    });
  }

  save(): void {
    this.saving = true;
    
    const storageAdd = new StorageInput();
    storageAdd.init(this.storage);
    storageAdd.structureId = this.selectedStructure.code;
    
    this._storageService.update(storageAdd).subscribe(
      () => {
        this.appMain.showSuccessMessage('Sửa thành công', 'Sửa kho thành công');
        this.onSave.emit();
        this._router.navigate(['app/storage']);
      },
      () => {
        this.saving = false;
      }
    )
  }

  Cancel(): void {
    this._router.navigate(['app/storage']);
  }
}
