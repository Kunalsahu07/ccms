import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { DeptwiseDocumentClick } from './deptwise-document-click';

const routes: Routes = [
  {
    path: '', component: DeptwiseDocumentClick
  }
]

@NgModule({
  declarations: [DeptwiseDocumentClick],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [DeptwiseDocumentClick]
})
export class DeptwiseDocumentClickModule { }
