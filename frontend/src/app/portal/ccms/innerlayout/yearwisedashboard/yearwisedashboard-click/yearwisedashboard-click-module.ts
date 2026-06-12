import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { YearwisedashboardClick } from './yearwisedashboard-click';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: YearwisedashboardClick,
  },
];

@NgModule({
  declarations: [YearwisedashboardClick],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, FormsModule],
  exports: [YearwisedashboardClick]
})
export class YearwisedashboardClickModule { }
