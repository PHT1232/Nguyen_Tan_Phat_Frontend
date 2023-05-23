import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { AppComponentBase } from '@shared/app-component-base';
import { UploadServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent extends AppComponentBase implements OnInit {

  

  constructor(
    injector: Injector,
    private _router: Router,
    private _uploadService: UploadServiceProxy,
    private appMain: AppComponent
  ) { 
    super(injector);

  }
  ngOnInit(): void {
  }


}
