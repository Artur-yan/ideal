import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { WorkspaceModule } from '@platform/components/workspace/workspace.module';
import { WorkspacePublicRoutingModule } from '@app/workspace-public/workspace-public-routing.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    CommonModule,
    WorkspaceModule,
    WorkspacePublicRoutingModule,
  ],
})
export class WorkspacePublicModule {
}
