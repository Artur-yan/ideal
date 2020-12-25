import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthCheckerGuard } from '@guards/auth-checker.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthCheckerGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('@app/workspace-public/workspace-public.module').then(m => m.WorkspacePublicModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
