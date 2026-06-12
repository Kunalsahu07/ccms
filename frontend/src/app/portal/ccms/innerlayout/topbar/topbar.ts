import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SidebarService } from '../../../../shared/services/sidebar-service';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {

  pageTitle = 'Overview';

  private routeTitles: Record<string, string> = {
    '/portal/ccms/adminHome/dashboard': 'Dashboard',
    '/portal/ccms/adminHome/yearwisedash': 'YearWise DashBoard',
    '/portal/ccms/adminHome/inbox': 'Inbox',
    '/portal/ccms/adminHome/actions/add_new_case': 'Actions > Add New Case',
    '/portal/ccms/adminHome/actions/upload_document': 'Actions > Upload Document',
    '/portal/ccms/adminHome/search/caseno': 'Search > Case No Search',
    '/portal/ccms/adminHome/search/agno': 'Search > AG No Search',
    '/settings': 'Settings',
    '/help': 'Help',
  };

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.pageTitle = this.routeTitles[e.urlAfterRedirects] ?? 'Dashboard';
      });
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }

  logout(): void {
    console.log('logout called');
    localStorage.clear();
    this.router.navigate(['/portal/ccms/login']);
  }
}
