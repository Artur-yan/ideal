import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { WorkspaceUserRoutingModule } from '@app/workspace-user/workspace-user-routing.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    WorkspaceUserRoutingModule,
  ],
})
export class WorkspaceUserModule {
}
