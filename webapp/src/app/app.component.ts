import { Component, ViewChild } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor,
} from '@materia-ui/ngx-monaco-editor';
import { ApiService } from './services/api-service';
import { SpinnerService } from './services/spinner.service';
import { MessageService } from 'primeng/api';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.scss`],
  providers: [MessageService],
})
export class AppComponent {
  input: string = '';
  output: string = '';

  valid = false;
  enableCopy = false;

  editorOptionsInput: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: 'java',
    roundedSelection: true,
    autoIndent: 'full',
  };
  editorOptionsOutput: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: 'yaml',
    roundedSelection: true,
    autoIndent: 'full',
  };

  constructor(
    private monacoLoaderService: MonacoEditorLoaderService,
    private apiService: ApiService,
    private spinner: SpinnerService,
    private clipboard: Clipboard,
    private message: MessageService
  ) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter((isLoaded) => !!isLoaded),
        take(1)
      )
      .subscribe(() => {
        this.registerMonacoCustomTheme();
      });
  }

  mergeOptions(partialOptions) {
    return {
      ...this.editorOptionsInput,
      ...this.editorOptionsOutput,
      ...partialOptions,
    };
  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    // Programatic content selection example
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3,
    });
  }
  registerMonacoCustomTheme() {
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark', // can also be vs or hc-black
      inherit: true, // can also be false to completely replace the builtin rules
      rules: [
        {
          token: 'comment',
          foreground: 'ffa500',
          fontStyle: 'italic underline',
        },
      ],
      colors: {},
    });
  }

  onChange() {
    this.valid = this.input.length > 10;
  }

  convert(path: string) {
    if (!this.valid && !(path === 'swagger-yml' || path === 'swaggermodel')) {
      return;
    }

    this.apiService.generateSwaggerYaml(this.input, path).subscribe((ouput) => {
      this.spinner.show();
      this.output = arrayBufferToString(ouput);
      this.spinner.hide();
      (error) => {
        console.error('Error', error);
      };
    });
  }

  copyToClipboard(isMail: boolean = false) {
    const contentToCopy = isMail ? 'aasifraza9123@gmail.com' : this.output;
    this.clipboard.copy(contentToCopy);
    this.message.add({
      severity: 'success',
      summary: 'Copied',
    });
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
