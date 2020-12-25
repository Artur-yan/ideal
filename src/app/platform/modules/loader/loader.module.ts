import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderDirective } from './directive/loader.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    LoaderDirective,
  ],
  exports: [
    LoaderComponent,
    LoaderDirective,
  ],
  imports: [
    CommonModule,
  ],
  entryComponents: [
    LoaderComponent,
  ],
})
export class LoaderModule {
}
