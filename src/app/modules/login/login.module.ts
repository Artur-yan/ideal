import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { MainComponent } from './main/main.component';
import { GlobalModule } from '@platform/components/global/global.module';
import { LoginComponent } from '@modules/login/pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { CreatePasswordComponent } from './pages/create-password/create-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CreateForgotPasswordComponent } from './pages/create-forgot-password/create-forgot-password.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { PrivacyModalComponent } from './components/privacy-modal/privacy-modal.component';
import { TermsModalComponent } from './components/terms-modal/terms-modal.component';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    CreatePasswordComponent,
    ForgotPasswordComponent,
    CreateForgotPasswordComponent,
    SocialLoginComponent,
    PrivacyModalComponent,
    TermsModalComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    GlobalModule,
  ],
})
export class LoginModule {
}
