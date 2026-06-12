
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { OicAllocate } from './oic-allocate';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'allot/:reg_no/:case_type/:reg_year/:cino_no',
    component: OicAllocate
  }
];


@NgModule({
  declarations: [OicAllocate],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, HttpClientModule],
  exports: [OicAllocate]
})
export class OicAllocateModule { }
