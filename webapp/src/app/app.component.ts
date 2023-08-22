import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { PrismService } from './services/prism.service';
import { SpinnerService } from './services/spinner.service';
import { ApiService } from './services/api-service';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy
{
  @ViewChild('textArea', { static: true })
  textArea!: ElementRef;
  @ViewChild('textArea2', { static: true })
  textArea2!: ElementRef;
  @ViewChild('codeContent', { static: true })
  codeContent!: ElementRef;
  @ViewChild('codeContent2', { static: true })
  codeContent2!: ElementRef;
  @ViewChild('pre', { static: true })
  pre!: ElementRef;
  @ViewChild('pre2', { static: true })
  pre2!: ElementRef;

  sub!: Subscription;
  highlighted = false;
  codeType = 'java';

  form = this.fb.group({
    content: '',
    swaggerYaml: '',
  });

  // get contentControl() {
  //   return this.form.get('content');
  // }

  get swaggerYamlControl() {
    return this.form.get('swaggerYaml');
  }
  swaggerYaml: string = '';

  constructor(
    private prismService: PrismService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private spinner: SpinnerService,
    private clipboard: Clipboard,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.listenForm();
    this.synchronizeScroll();
  }

  ngAfterViewInit() {
    this.prismService.highlightAll();
  }

  ngAfterViewChecked() {
    if (this.highlighted) {
      this.prismService.highlightAll();
      this.highlighted = false;
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private listenForm() {
    this.sub = this.form.valueChanges.subscribe((val) => {
      const modifiedContent = this.prismService.convertHtmlIntoString(
        val.content
      );

      this.renderer.setProperty(
        this.codeContent.nativeElement,
        'innerHTML',
        modifiedContent
      );

      this.swaggerYaml = '';
      this.highlighted = true;
    });
  }

  private synchronizeScroll() {
    const localSub = fromEvent(this.textArea.nativeElement, 'scroll').subscribe(
      () => {
        const toTop = this.textArea.nativeElement.scrollTop;
        const toLeft = this.textArea.nativeElement.scrollLeft;
        const toTop2 = this.textArea2.nativeElement.scrollTop;
        const toLeft2 = this.textArea2.nativeElement.scrollLeft;

        this.renderer.setProperty(this.pre.nativeElement, 'scrollTop', toTop);
        this.renderer.setProperty(
          this.pre.nativeElement,
          'scrollLeft',
          toLeft + 0.2
        );
        this.renderer.setProperty(this.pre2.nativeElement, 'scrollTop', toTop2);
        this.renderer.setProperty(
          this.pre2.nativeElement,
          'scrollLeft',
          toLeft2 + 0.2
        );
      }
    );

    this.sub.add(localSub);
  }
  generateSwaggerYaml(action: string) {
    this.swaggerYaml = '';
    console.log(
      'action -> ' + action,
      'Value -> ' + this.form.get('content')?.value
    );
    this.spinner.show();
    const endpoint = action === 'model' ? 'swaggermodel' : 'swagger-yml';
    this.apiService
      .generateSwaggerYaml(this.form.get('content')?.value, endpoint)
      .subscribe(
        (data) => {
          this.swaggerYaml = arrayBufferToString(data);
          console.log(data);
          console.log('data :', JSON.stringify(data));

          this.renderer.setProperty(
            this.codeContent2.nativeElement,
            'innerHTML',
            this.swaggerYaml
          );
          this.highlighted = true;
          this.spinner.hide();
        },
        (error) => {
          console.log(JSON.stringify(error));
          this.spinner.hide();
        }
      );
  }

  copyToClipboard(isMail: boolean = false) {
    let copy = this.swaggerYaml;
    const contentToCopy = isMail ? 'aasifraza9123@gmail.com' : copy;
    // this.message.show();
    this.clipboard.copy(contentToCopy);
    this.showCopySnackbar();
  }
  showCopySnackbar() {
    setTimeout(() => {
      // this.message.hide();
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
