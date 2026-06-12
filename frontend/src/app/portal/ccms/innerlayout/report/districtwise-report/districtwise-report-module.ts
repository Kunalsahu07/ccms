import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DistrictwiseReport } from './districtwise-report';

const routes: Routes = [
  {
    path: '', component: DistrictwiseReport
  }
]

@NgModule({
  declarations: [DistrictwiseReport],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DistrictwiseReport]
})
export class DistrictwiseReportModule { }
