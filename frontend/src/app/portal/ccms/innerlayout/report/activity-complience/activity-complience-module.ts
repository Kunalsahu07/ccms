import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComplience } from './activity-complience';

const routes: Routes = [
  {
    path: '', component: ActivityComplience
  }
]

@NgModule({
  declarations: [ActivityComplience],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [ActivityComplience]
})
export class ActivityComplienceModule { }
