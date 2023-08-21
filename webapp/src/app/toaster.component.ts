import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'toast-severity-demo',
  template: ` <p-toast position="top-right" key="tr"></p-toast> `,
  providers: [MessageService],
})
export class ToasterComponent {
  constructor(private messageService: MessageService) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Copied',
    });
  }
}
