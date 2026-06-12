import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '../../../../shared/services/sidebar-service';

export interface NavChild {
  label: string;
  route: string;
  icon?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  route?: string;        // optional — absent when item has children
  badge?: number;
  children?: NavChild[]; // present when item is a submenu parent
  roles?: string[];
}
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {

  collapsed$: any;
  isCollapsed = false;
  activeRoute = '/portal/ccms/adminHome/dashboard';
  expandedItem: string | null = null;
  actionsOpen = false;
  email: any;
  fullname: any;
  RoleType: string = '';

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {
    this.collapsed$ = this.sidebarService.collapsed$;
    this.email = localStorage.getItem('email');
    this.fullname = localStorage.getItem('fullname');
    this.RoleType = localStorage.getItem('roleType') ?? '';
  }

  mainNav: NavItem[] = [
    {
      label: 'Overview',
      icon: 'layout-dashboard',
      route: '/portal/ccms/adminHome/dashboard'
      // no roles = everyone sees it
    },
    {
      label: 'YearWiseDash',
      icon: 'chart-bar',
      route: '/portal/ccms/adminHome/yearwisedash',

    },
    {
      label: 'Inbox',
      icon: 'inbox',
      route: '/portal/ccms/adminHome/inbox',
      roles: ['DIR',]  // SLO excluded
    },
    {
      label: 'Actions',
      icon: 'click',
      children: [
        { label: 'Add New Case', icon: 'world', route: '/portal/ccms/adminHome/actions/add_new_case' },
        { label: 'Upload Document', icon: 'building-store', route: '/portal/ccms/adminHome/actions/upload_document' },
      ]
    },
    {
      label: 'OIC',
      icon: 'package',
      children: [
        { label: 'Create OIC Order', icon: 'plus', route: '/portal/ccms/adminHome/oic/create' },
        { label: 'Incoming OIC Request', icon: 'backpack', route: '/portal/ccms/adminHome/oic/request' }
      ]
    },
    {
      label: 'Query',
      icon: 'help-circle',
      children: [
        { label: 'Query Builder', route: '/portal/ccms/adminHome/query/builder' },
        { label: 'Officewise DashBoard', route: '/portal/ccms/adminHome/query/officewiseDashboard' }
      ]
    },
    {
      label: 'Search',
      icon: 'search',
      // no roles = everyone sees it
      children: [
        { label: 'Case No Search', route: '/portal/ccms/adminHome/search/caseno' },
        { label: 'AG No Search', route: '/portal/ccms/adminHome/search/agno' }
      ]
    },
    {
      label: 'Case Transfer',
      icon: 'transfer',
      route: '/portal/ccms/adminHome/casetransfer',

    },
    {
      label: 'Report',
      icon: 'file-analytics',

      children: [
        { label: 'Document Uploaded', icon: 'upload', route: '/portal/ccms/adminHome/report/documentUploaded' },
        { label: 'MIS Report', icon: 'backpack', route: '/portal/ccms/adminHome/report/mis' },
        { label: 'User Details', icon: 'user', route: '/portal/ccms/adminHome/report/userDetails' },
        { label: 'App Downloaded User', icon: 'bookmark-plus', route: '/portal/ccms/adminHome/report/appDownloadedUser' },
        { label: 'Case Logs Report', icon: 'clipboard-list', route: '/portal/ccms/adminHome/report/caselogReport' },
        { label: 'Deptwise Report', icon: 'file-text', route: '/portal/ccms/adminHome/report/deptwiseReport' },
        { label: 'Today Login', icon: 'login', route: '/portal/ccms/adminHome/report/todayLogin' },
        { label: 'Officewise Report', icon: 'report', route: '/portal/ccms/adminHome/report/officewiseReport' },
        { label: 'Districtwise Report', icon: 'book', route: '/portal/ccms/adminHome/report/districtwiseReport' },
        { label: 'SP Wise Report', icon: 'webhook', route: '/portal/ccms/adminHome/report/spwiseReport' }
      ]
    }
  ];

  secondaryNav: NavItem[] = [
    { label: 'Help', icon: 'help-circle', route: '/portal/ccms/adminHome/help' },
  ];

  // ── Role filter getter ────────────────────────────────────

  /** Returns only nav items the current role is allowed to see */
  get filteredMainNav(): NavItem[] {
    return this.mainNav.filter(item => this.isItemVisible(item));
  }

  get filteredSecondaryNav(): NavItem[] {
    return this.secondaryNav.filter(item => this.isItemVisible(item));
  }

  /** No roles defined → visible to all. Otherwise check if RoleType is in list */
  isItemVisible(item: NavItem): boolean {
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.includes(this.RoleType);
  }

  // ── rest of your methods stay exactly the same ────────────

  ngOnInit(): void {
    this.activeRoute = this.router.url;
    this.sidebarService.collapsed$.subscribe((c: boolean) => this.isCollapsed = c);
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.activeRoute = e.urlAfterRedirects;
        this.autoExpand();
      });
    this.autoExpand();
  }

  hasChildren(item: NavItem): boolean {
    return !!(item.children && item.children.length > 0);
  }

  isExpanded(item: NavItem): boolean {
    return this.expandedItem === item.label;
  }

  isActive(item: NavItem): boolean {
    const url = this.router.url.split('?')[0];
    if (item.route) {
      return url === item.route || url.startsWith(item.route + '/');
    }
    return item.children?.some(c =>
      url === c.route || url.startsWith(c.route + '/')
    ) ?? false;
  }

  isChildActive(route: string): boolean {
    const url = this.router.url.split('?')[0];
    return url === route || url.startsWith(route + '/');
  }

  navigate(item: NavItem): void {
    if (this.hasChildren(item)) {
      this.expandedItem = this.isExpanded(item) ? null : item.label;
    } else if (item.route) {
      this.activeRoute = item.route;
      this.router.navigateByUrl(item.route);
    }
  }

  navigateChild(child: NavChild): void {
    this.activeRoute = child.route;
    this.router.navigateByUrl(child.route);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.actions-wrapper')) {
      this.actionsOpen = false;
    }
  }

  toggleActions(e: MouseEvent): void {
    e.stopPropagation();
    this.actionsOpen = !this.actionsOpen;
  }

  private autoExpand(): void {
    for (const item of [...this.mainNav, ...this.secondaryNav]) {
      if (item.children?.some(c => this.activeRoute === c.route)) {
        this.expandedItem = item.label;
        return;
      }
    }
  }
}