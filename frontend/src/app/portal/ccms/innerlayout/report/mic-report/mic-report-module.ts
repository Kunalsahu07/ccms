import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { MicReport } from './mic-report';

const routes: Routes = [
  {
    path: '', component: MicReport
  }
]

@NgModule({
  declarations: [MicReport],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [MicReport]
})
export class MicReportModule { }
