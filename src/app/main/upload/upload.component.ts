import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/app-component-base';
import { FileDownloadService, UploadServiceProxy } from '@shared/service-proxies/service-proxies';

const URL = AppConsts.remoteServiceBaseUrl + '/api/Upload/Upload?fileFolderPath=Product';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends AppComponentBase implements OnInit {

  linkFile = "";

  constructor(
    injector: Injector,
    private _router: Router,
    private http: HttpClient,
    private _fileService: FileDownloadService,
    private _uploadService: UploadServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);

  }
  ngOnInit(): void {
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  UploadFile() {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append('file', file);
    }
    this.http.post(URL, formData).subscribe((res) => {
      console.log(res);
    })
    // this._uploadService.testUpload()
  }

  DownloadFile() {
    this._uploadService.getDownloadExcel("\\PHIEU XUAT KHO.xlsx").subscribe((res) =>
    {
        this._fileService.downloadTempFile(res);
        console.log(res);
    });
  }

}
