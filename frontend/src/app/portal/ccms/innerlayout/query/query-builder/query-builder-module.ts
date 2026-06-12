import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { QueryBuilder } from './query-builder';

const routes: Routes = [
  {
    path: '',
    component: QueryBuilder
  }
]

@NgModule({
  declarations: [QueryBuilder],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [QueryBuilder]
})
export class QueryBuilderModule { }
