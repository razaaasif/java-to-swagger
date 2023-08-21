import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToasterComponent } from './toaster.component';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [AppComponent , ToasterComponent , SpinnerComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ToastModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
