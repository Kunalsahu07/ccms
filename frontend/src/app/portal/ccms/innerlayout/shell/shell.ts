import { Component } from '@angular/core';
import { SidebarService } from '../../../../shared/services/sidebar-service'

@Component({
  selector: 'app-shell',
  standalone: false,
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {

  collapsed$: any;

  constructor(private sidebarService: SidebarService) {
    this.collapsed$ = this.sidebarService.collapsed$;
  }

}
