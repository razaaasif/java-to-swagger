import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from './api-service';
import { catchError } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { TosterService } from './toaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('copyableEmail', { static: false }) copyableEmail!: ElementRef;

  javaClassCode = '';
  swaggerYaml = '';

  constructor(
    private apiService: ApiService,
    private spinner: SpinnerService,
    private clipboard: Clipboard,
    private message: TosterService
  ) {}

  // copyEmailToClipboard() {
  //   if (this.copyableEmail) {
  //     const emailText = this.copyableEmail.nativeElement.textContent.trim();
  //     const tempElement = document.createElement('textarea');
  //     tempElement.value = emailText;
  //     document.body.appendChild(tempElement);
  //     tempElement.select();
  //     document.execCommand('copy');
  //     document.body.removeChild(tempElement);
  //   }
  // }
  generateSwaggerYaml(action: string) {
    console.log('action -> ' + action);
    this.spinner.show();
    const endpoint = action === 'model' ? 'swaggermodel' : 'swagger-yml';
    this.apiService.generateSwaggerYaml(this.javaClassCode, endpoint).subscribe(
      (data) => {
        this.swaggerYaml = arrayBufferToString(data);
        console.log(data);
        console.log('data :', JSON.stringify(data));
        this.spinner.hide();
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.spinner.hide();
      }
    );
  }
  // copyToClipboard(text: string) {
  //   const textarea = document.createElement('textarea');
  //   textarea.value = text;
  //   document.body.appendChild(textarea);
  //   textarea.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(textarea);
  // }
  copyToClipboard(isMail: boolean = false) {
    const contentToCopy = isMail ? 'aasifraza9123@gmail.com' : this.swaggerYaml;
    this.clipboard.copy(contentToCopy);
    this.message.show();
    this.showCopySnackbar();
  }
  showCopySnackbar() {
    setTimeout(() => {
      this.message.hide();
    }, 2000);
  }
}

function arrayBufferToString(buffer: ArrayBuffer): string {
  var bufView = new Uint8Array(buffer); // Use Uint8Array instead of Uint16Array
  var length = bufView.length;
  var result = '';

  for (var i = 0; i < length; i++) {
    result += String.fromCharCode(bufView[i]);
  }

  return result;
}
