import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseTransfer } from './case-transfer';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CaseTransfer
  }
]

@NgModule({
  declarations: [CaseTransfer],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CaseTransfer]
})
export class CaseTransferModule { }
