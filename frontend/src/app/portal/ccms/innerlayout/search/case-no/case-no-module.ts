import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaseNo } from './case-no';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: CaseNo
  }
]

@NgModule({
  declarations: [CaseNo],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, HttpClientModule],
  exports: [CaseNo]
})

export class CaseNoModule { }
