import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from '@modules/login/pages/login/login.component';
import { RegisterComponent } from '@modules/login/pages/register/register.component';
import { VerifyComponent } from '@modules/login/pages/verify/verify.component';
import { CreatePasswordComponent } from '@modules/login/pages/create-password/create-password.component';
import { ForgotPasswordComponent } from '@modules/login/pages/forgot-password/forgot-password.component';
import { CreateForgotPasswordComponent } from '@modules/login/pages/create-forgot-password/create-forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'create-password',
        component: CreatePasswordComponent,
      },
      {
        path: 'create-forgot-password',
        component: CreateForgotPasswordComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'verify',
        component: VerifyComponent,
      },
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}
