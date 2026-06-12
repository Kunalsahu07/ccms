import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ccms',
    loadChildren: () =>
      import('./ccms/ccms-module').then((m) => m.CcmsModule),
  },
  {
    path: '',
    redirectTo: 'ccms',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule { }
