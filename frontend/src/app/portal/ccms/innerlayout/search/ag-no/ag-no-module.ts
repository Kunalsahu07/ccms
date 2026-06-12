import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AgNo } from './ag-no';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '', component: AgNo
  }
]

@NgModule({
  declarations: [AgNo],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, HttpClientModule],
  exports: [AgNo]
})
export class AgNoModule { }
