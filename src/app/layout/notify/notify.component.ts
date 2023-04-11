import { Component } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  providers: [MessageService]
})
export class NotifyComponent {
  
  constructor(
    private message: MessageService,
  ) {}

  messageNotify(severity: string, summary: string, detail: string) {
    this.message.add({ severity: severity, summary: summary, detail: detail});
  }
}
