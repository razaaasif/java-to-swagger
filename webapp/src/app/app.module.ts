import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonacoEditorModule ,MONACO_PATH} from '@materia-ui/ngx-monaco-editor';
 import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
 
 
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ToasterComponent } from './component/toaster.component';
import { FooterComponent } from './component/footer.component';
 
@NgModule({
  declarations: [AppComponent, ToasterComponent, FooterComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BrowserAnimationsModule,
    MonacoEditorModule,
        MatToolbarModule,
    MatCardModule,
   ],
  providers: [ {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.31.1/min/vs',
    },],
  bootstrap: [AppComponent],
})
export class AppModule {}
