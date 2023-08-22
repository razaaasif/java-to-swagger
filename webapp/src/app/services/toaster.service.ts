// import {
//   Injectable,
//   ComponentRef,
//   ComponentFactoryResolver,
//   ApplicationRef,
//   Injector,
// } from '@angular/core';
// import { ToasterComponent } from '../component/toaster.component';
//   @Injectable({
//    providedIn: 'root',
//  })
//  export class TosterService {
//    private spinnerRef: ComponentRef<ToasterComponent> | null = null;

//    constructor(
//      private componentFactoryResolver: ComponentFactoryResolver,
//      private appRef: ApplicationRef,
//      private injector: Injector
//    ) {}

//    show(): void {
//      if (!this.spinnerRef) {
//        const componentFactory =
//          this.componentFactoryResolver.resolveComponentFactory(
//            ToasterComponent
//          );
//        this.spinnerRef = componentFactory.create(this.injector);
//        this.appRef.attachView(this.spinnerRef.hostView);
//        const spinnerElement = (this.spinnerRef.hostView as any)
//          .rootNodes[0] as HTMLElement;
//        document.body.appendChild(spinnerElement);
//      }
//    }

//    hide(): void {
//      setTimeout(() => {
//        if (this.spinnerRef) {
//          this.appRef.detachView(this.spinnerRef.hostView);
//          this.spinnerRef.destroy();
//          this.spinnerRef = null;
//        }
//      }, 1000);
//    }
//  }
