import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CaselogReport } from './caselog-report';

const routes: Routes = [
  {
    path: '', component: CaselogReport
  }
]

@NgModule({
  declarations: [CaselogReport],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CaselogReport]
})
export class CaselogReportModule { }
