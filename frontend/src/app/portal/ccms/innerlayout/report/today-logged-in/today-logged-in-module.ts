import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { TodayLoggedIn } from './today-logged-in';

const routes: Routes = [
  {
    path: '', component: TodayLoggedIn
  }
]

@NgModule({
  declarations: [TodayLoggedIn],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [TodayLoggedIn]
})
export class TodayLoggedInModule { }
