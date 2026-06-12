import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Yearwisedashboard } from './yearwisedashboard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { YearwisedashboardClick } from './yearwisedashboard-click/yearwisedashboard-click';

const routes: Routes = [
  {
    path: '',
    component: Yearwisedashboard,
  },
];

@NgModule({
  declarations: [Yearwisedashboard],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule, FormsModule],
  exports: [Yearwisedashboard],
})
export class YearwisedashboardModule {}
