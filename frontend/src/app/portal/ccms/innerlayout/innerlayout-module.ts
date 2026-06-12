import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Shell } from './shell/shell';
import { Sidebar } from './sidebar/sidebar';
import { Topbar } from './topbar/topbar';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [Shell, Sidebar, Topbar],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [Shell],
})
export class InnerlayoutModule {}
