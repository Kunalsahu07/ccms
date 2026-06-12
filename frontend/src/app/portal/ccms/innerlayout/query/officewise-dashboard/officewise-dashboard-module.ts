import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OfficewiseDashboard } from './officewise-dashboard';

const routes: Routes = [
  {
    path: '', component: OfficewiseDashboard
  }
]

@NgModule({
  declarations: [OfficewiseDashboard],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [OfficewiseDashboard]
})
export class OfficewiseDashboardModule { }
