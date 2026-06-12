import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../../../shared/services/dashboard-service'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActionService } from '../../../../shared/services/action-service';
import { forkJoin } from 'rxjs';


export interface KpiCard {
  label: string;
  value: number;
  subtext: string;
  icon?: string;
  colorClass: string;
  route?: string;
}

export interface StatRow {
  label: string;
  value: number;
  color: string;
  badgeStyle?: string;
  route?: string;
}

export interface BarRow {
  label: string;
  value: number;
  total: number;
  color: string;
  note?: string;
  route?: string;
}

@Component({
  selector: 'app-yearwisedashboard',
  standalone: false,
  templateUrl: './yearwisedashboard.html',
  styleUrl: './yearwisedashboard.scss',
})
export class Yearwisedashboard implements OnInit {
  total_case = 0;
  pending_case = 0;
  disposed_case = 0;

  criminal_case = 0;
  contempt_case = 0;
  civil_case = 0;
  service_case = 0;
  selectedYear = 2026;
  years: any[] = [];
  deptId: any;
  pen_case_reply = 0;

  constructor(private dashboardService: DashboardService, private actionService: ActionService, private cdr: ChangeDetectorRef, private router: Router) {
    this.deptId = localStorage.getItem('deptId');
  }

  ngOnInit(): void {
    this.actionService.getYear().subscribe({
      next: (res: any) => {
        this.years = res.reverse();
      }
    });

    this.loadDashboardData(this.selectedYear); // load with default year 2026
  }

  onYearChange(year: any): void {
    console.log('Selected Year:', year);
    this.selectedYear = year;
    this.loadDashboardData(year); // just call loadDashboardData, not ngOnInit
  }

  loadDashboardData(year: any): void {
    Swal.fire({
      title: 'Loading...',
      text: 'Fetching dashboard data, please wait.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading()
    });

    // ✅ All 5 APIs fire at the SAME TIME
    forkJoin({
      cases: this.dashboardService.getCaseDetailsForDashboardByYear(this.deptId, year),
      caseTypes: this.dashboardService.getCaseTypeDetailsForDashboardByYear(this.deptId, year),
      oic: this.dashboardService.getOicCountByYear(this.deptId, year),
      compliance: this.dashboardService.getComplianceCountByYear(this.deptId, year),
      reply: this.dashboardService.getReplyCountByYear(this.deptId, year),
    }).subscribe({
      next: ({ cases, caseTypes, oic, compliance, reply }: any) => {
        Swal.close();

        // --- Main counts ---
        this.total_case = cases.totalCase.total_cases;
        this.pending_case = cases.pending.pending_cases;
        this.disposed_case = cases.disposedCase.disposed_cases;

        // --- Case types ---
        this.service_case = caseTypes[0].service_cases;
        this.civil_case = caseTypes[0].civil_cases;
        this.contempt_case = caseTypes[0].contempt_cases;
        this.criminal_case = caseTypes[0].criminal_cases;

        // --- Reply ---
        this.pen_case_reply = reply[0].total_alloted;

        // --- Build all UI data at once ---
        this.kpis = [
          { label: 'Total cases', value: this.total_case, subtext: 'All registered cases', colorClass: 'kpi-red', route: 'TOTAL_CASE' },
          { label: 'Total pending', value: this.pending_case, subtext: '24.9% of total', colorClass: 'kpi-amber', route: 'P' },
          { label: 'Pending case reply', value: this.pen_case_reply, subtext: '34.6% of pending', colorClass: 'kpi-purple', route: 'OA' },
          { label: 'Court Order Compliance', value: this.disposed_case, subtext: '75.1% resolution rate', colorClass: 'kpi-green', route: 'D' },
        ];

        this.caseTypes = [
          { label: 'Pending', value: this.pending_case, color: '#D85A30', route: 'P' },
          { label: 'Disposed', value: this.disposed_case, color: '#1D9E75', route: 'D' },
          { label: 'Service', value: this.service_case, color: '#536b82', route: 'SERVICE' },
          { label: 'Criminal', value: this.criminal_case, color: '#BA7517', route: 'CRIMINAL' },
          { label: 'Civil', value: this.civil_case, color: '#7F77DD', route: 'CIVIL' },
          { label: 'Contempt', value: this.contempt_case, color: '#444444', route: 'CONTEMPT' },
          { label: 'Upcoming contempt', value: 0, color: '#333333', route: 'upcoming_contempt' },
        ];

        const oicCounts = oic.OicCounts;
        const PendAlloted = oic.pending_alloted;

        this.oicBars = [
          { label: 'OIC appointed', value: this.pen_case_reply, total: this.pending_case, color: '#1D9E75', route: 'OA' },
          { label: 'OIC not appointed', value: PendAlloted.pending_for_total_alloted, total: this.pending_case, color: '#D85A30', route: 'ONA' },
          { label: 'OIC not required', value: oicCounts.compliance_not_required, total: this.pending_case, color: '#555555', route: 'ONR' },
        ];

        this.oicStats = [
          { label: 'Formal party', value: oicCounts.fParty, color: '#7F77DD', route: 'FP' },
          { label: 'Fwd to district', value: oicCounts.fwdDir, color: '#378ADD', route: 'FWDIR' },
          { label: 'Not forwarded', value: oicCounts.nFwdDir, color: '#D4537E', route: 'NFWDIR' },
          { label: 'Last 30 days order', value: 0, color: '#EF9F27', route: '' },
        ];

        this.complianceStats = [
          { label: 'Compliance done', value: compliance[0].court_order_compliance_close, color: '#97C459', badgeStyle: 'green', route: 'COM_DONE' },
          { label: 'Not required', value: compliance[0].compNoReq, color: '#666666', badgeStyle: 'gray', route: 'COM_N_REQ' },
          { label: 'Not allotted', value: compliance[0].court_order_compliance_not_alloted, color: '#F0997B', badgeStyle: 'red', route: 'COM_N_ALLOTTED' },
          { label: 'Allotted', value: compliance[0].court_order_compliance_total, color: '#97C459', badgeStyle: 'green', route: 'COM_ALLOTTED' },
          { label: 'Pending review', value: compliance[0].corder_comp_pend_for_review, color: '#85B7EB', badgeStyle: 'blue', route: 'COM_PEND_REVIEW' },
          { label: 'Compliance pending', value: compliance[0].court_order_compliance_open, color: '#555555', badgeStyle: 'gray', route: 'COM_PEND' },
        ];

        this.replyBars = [
          { label: 'Reply filed', value: reply[0].reply_filed, total: this.pen_case_reply, color: '#1D9E75', route: 'RPLY_FILED' },
          { label: 'Reply not filed', value: reply[0].pending_reply_filed, total: this.pen_case_reply, color: '#EF9F27', route: 'RPLY_N_FILED' },
          { label: 'Not required', value: reply[0].reply_not_required, total: this.pen_case_reply, color: '#444444', route: 'RPLY_N_REQ' },
        ];

        this.cdr.detectChanges();
      },
      error: () => {
        Swal.fire('Error', 'Failed to load dashboard data.', 'error');
      }
    });
  }


  kpis: KpiCard[] = [];
  caseTypes: StatRow[] = [];
  oicBars: BarRow[] = [];
  complianceStats: StatRow[] = [];
  oicStats: StatRow[] = [];
  replyBars: BarRow[] = [];


  complianceDonePct = Math.round((12752 / 33330) * 100);

  barWidth(value: number, total: number): string {
    return Math.round((value / total) * 100) + '%';
  }

  formatNumber(n: number): string {
    return n.toLocaleString('en-IN');
  }
  navigateTo(route?: string): void {
    if (route) this.router.navigate(['/portal/ccms/adminHome/yearwisedash_click'], { queryParams: { type: route, year: this.selectedYear } });
  }
}
