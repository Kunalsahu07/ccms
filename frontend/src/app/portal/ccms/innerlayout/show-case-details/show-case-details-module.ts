import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowCaseDetails } from './show-case-details';

const routes: Routes = [
  {
    path: 'case-details/:reg_no/:case_type/:reg_year/:cino_no',
    component: ShowCaseDetails
  }
]
@NgModule({
  declarations: [ShowCaseDetails],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, HttpClientModule],
  exports: [ShowCaseDetails]
})

export class ShowCaseDetailsModule { }
