import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardClick } from './dashboard-click';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: DashboardClick
  },
];

@NgModule({
  declarations: [DashboardClick],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, FormsModule],
  exports: [DashboardClick]
})
export class DashboardClickModule { }
