import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ToasterComponent,
  ],
  exports: [
    ToasterComponent,
  ],
})
export class ToasterModule { }
