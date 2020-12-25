import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@app/workspace-public/main/main.component';
import { GuestGuard } from '@guards/guest.guard';
import { USER_BASE_ROUTE } from '@platform/constants/routes';
import { UserGuard } from '@platform/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: USER_BASE_ROUTE,
        loadChildren: () => import('@app/modules/user/user.module').then(m => m.UserModule),
        canActivate: [UserGuard],
      },
      {
        path: 'home',
        loadChildren: () => import('@app/modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'login',
        loadChildren: () => import('@app/modules/login/login.module').then(m => m.LoginModule),
        canActivate: [GuestGuard],
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspacePublicRoutingModule {
}
