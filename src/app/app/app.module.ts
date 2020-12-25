import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { ToasterModule } from '@platform/modules/toaster/toaster.module';
import { HttpModule } from '@platform/modules/http/http.module';
import { TranslatePipe } from '@pipes/translate.pipe';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ToasterModule,
    BrowserAnimationsModule,
    HttpModule.forRoot(),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [TranslatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
