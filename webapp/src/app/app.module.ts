import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radioButton';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageModule } from 'primeng/message';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
 import { ToasterComponent } from './component/toaster.component';
import { FooterComponent } from './component/footer.component';
 @NgModule({
   declarations: [AppComponent, ToasterComponent, FooterComponent],
   imports: [
     BrowserModule,
     AppRoutingModule,
     ReactiveFormsModule,
     HttpClientModule,
     FormsModule,
     MessagesModule,
     ToastModule,
     BrowserModule,
     ToolbarModule,
     FormsModule,
     AppRoutingModule,
     HttpClientModule,
     RadioButtonModule,
     ButtonModule,
     MessagesModule,
     MessageModule,
     ToastModule,
     BrowserAnimationsModule
   ],
   providers: [],
   bootstrap: [AppComponent],
 })
 export class AppModule {}
