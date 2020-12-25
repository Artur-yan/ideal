import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { GlobalModule } from '@platform/components/global/global.module';
import { HomeRoutingModule } from './home-routing.module';
import { SliderComponent } from './components/slider/slider.component';
import { FirmsComponent } from './components/firms/firms.component';
import { BestProductsComponent } from './components/best-products/best-products.component';

@NgModule({
  declarations: [
    MainComponent,
    SliderComponent,
    FirmsComponent,
    BestProductsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    GlobalModule,
  ],
})
export class HomeModule {
}
