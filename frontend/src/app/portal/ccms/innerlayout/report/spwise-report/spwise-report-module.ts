import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { SpwiseReport } from './spwise-report';

const routes: Routes = [
  {
    path: '', component: SpwiseReport
  }
]

@NgModule({
  declarations: [SpwiseReport],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [SpwiseReport]
})
export class SpwiseReportModule { }
