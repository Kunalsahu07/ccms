import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOicOrder } from './create-oic-order';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CreateOicOrder
  }
];


@NgModule({
  declarations: [CreateOicOrder],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [CreateOicOrder]
})
export class CreateOicOrderModule { }
