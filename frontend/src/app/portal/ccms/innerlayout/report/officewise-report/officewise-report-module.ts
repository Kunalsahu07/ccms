import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficewiseReport } from './officewise-report';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: OfficewiseReport
  }
]

@NgModule({
  declarations: [OfficewiseReport],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [OfficewiseReport]
})
export class OfficewiseReportModule { }
