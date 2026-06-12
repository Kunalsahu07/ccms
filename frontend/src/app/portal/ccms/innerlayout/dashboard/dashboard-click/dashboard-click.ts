import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../../../shared/services/dashboard-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-click',
  standalone: false,
  templateUrl: './dashboard-click.html',
  styleUrl: './dashboard-click.scss',
})

export class DashboardClick implements OnInit {
  type: string = '';
  deptId: any;
  cases: any[] = [];
  filteredCases: any[] = [];
  loading = false;

  pageSize = 10;
  currentPage = 1;
  totalRecords = 0;
  status: any;

  btn_delete = false
  btn_history = false

  btn_allocate = false;
  btn_oic_not_required = false;
  btn_create_oic_request = false;
  btn_reply_not_required = false;

  filterNature: string = '';
  filterNumber: number | null = null;
  filterYear: number | null = null;
  caseNatures: string[] = [];


  typeColorMap: Record<string, string> = {
    P: '#D85A30',
    D: '#1D9E75',
    TOTAL_CASE: '#21a54f',
    SERVICE: '#378ADD',
    CRIMINAL: '#BA7517',
    CIVIL: '#7F77DD',
    CONTEMPT: '#444444',
  };

  get accentColor(): string {
    return this.typeColorMap[this.type] || '#21a54f';
  }

  get pageTitle(): string {
    return this.type.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()) + ' Cases';
  }

  get pagedCases(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCases.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCases.length / this.pageSize);
  }

  showButtons() {
    this.btn_history = true;
    this.btn_allocate = true;
    this.btn_delete = true;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {
    this.deptId = localStorage.getItem('deptId');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.clearFilters(); // Clear previous searches when category changes
      this.currentPage = 1;
      this.loadCases(this.type);
    });
  }

  applyFilters(): void {
    this.filteredCases = this.cases.filter(c => {
      const matchNature = !this.filterNature || c.type_name_reg === this.filterNature;
      const matchNumber = !this.filterNumber || String(c.reg_no).includes(String(this.filterNumber));
      const matchYear = !this.filterYear || String(c.reg_year) === String(this.filterYear);

      return matchNature && matchNumber && matchYear;
    });

    this.currentPage = 1; // Reset to page 1 on active search changes
    this.cdr.detectChanges();
  }

  clearFilters(): void {
    this.filterNature = '';
    this.filterNumber = null;
    this.filterYear = null;
    this.filteredCases = [...this.cases];
  }

  private extractUniqueNatures(): void {
    this.caseNatures = [...new Set(this.cases.map(c => c.type_name_reg))].filter(Boolean).sort();
  }

  loadCases(type: string): void {
    Swal.fire({
      title: 'Fetching Cases...',
      text: 'Please wait while we load the data.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.loading = true;

    if (type === "P" || type === "D") {
      this.dashboardService.getFullCaseDetailsUsingDeptIdAndPendDisp(this.deptId, this.type).subscribe({
        next: (res: any) => {
          Swal.close();
          this.cases = res || [];
          this.status = this.type === "P" ? 'Pending' : 'Disposed';
          this.showButtons();

          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching cases:', err);
          Swal.close();
          this.loading = false;
        }
      });
    } else if (this.type === "TOTAL_CASE") {
      this.dashboardService.getAllCaseDetailsByDeptId(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close();
          this.cases = res || [];
          this.showButtons();
          // Fixed structural typo condition check bug from assignment (=) to comparison (===)
          if (res && res.length > 0) {
            this.status = res[0].pend_disp === "P" ? 'Pending' : 'Disposed';
          }
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          Swal.close();
          this.loading = false;
        }
      });
    } else if (this.type === "SERVICE") {
      this.dashboardService.getServiceCaseDetails(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close();

          this.showButtons();
          this.btn_oic_not_required = true;
          this.btn_create_oic_request = true;

          this.cases = res || [];
          this.status = 'Pending';
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          Swal.close();
          this.loading = false;
        }
      });
    } else if (this.type === "CIVIL") {
      this.dashboardService.getCivilCaseDetails(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close();

          this.showButtons();
          this.btn_oic_not_required = true;
          this.btn_create_oic_request = true;

          this.cases = res || [];
          this.status = 'Pending';
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          Swal.close();
          this.loading = false;
        }
      });
    } else if (this.type === "CRIMINAL") {
      this.dashboardService.getCriminalCaseDetails(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close();

          this.showButtons();
          this.btn_oic_not_required = true;
          this.btn_create_oic_request = true;

          this.cases = res || [];
          this.status = 'Pending';
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          Swal.close();
          this.loading = false;
        }
      });
    } else if (this.type === "CONTEMPT") {
      this.dashboardService.getContemptCaseDetails(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close();

          this.showButtons();
          this.btn_oic_not_required = true;
          this.btn_create_oic_request = true;

          this.cases = res || [];
          this.status = 'Pending';
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          Swal.close();
          this.loading = false;
        }
      });
    }
    else if (this.type === "OA") {
      this.dashboardService.getOicAppointed(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "ONA") {
      this.dashboardService.getOicNotAppointed(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.showButtons();
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "ONR") {
      this.dashboardService.getOicNotReq(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "FP") {
      this.dashboardService.getOicFormalParty(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "FWDIR") {
      this.dashboardService.getOicFwdir(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "NFWDIR") {
      this.dashboardService.getOicNoFwdir(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "COM_DONE") {
      this.dashboardService.getComplianceDone(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "COM_N_REQ") {
      this.dashboardService.getComplianceNotReq(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "COM_N_ALLOTTED") {
      this.dashboardService.getComplianceNotAllotted(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "COM_ALLOTTED") {
      this.dashboardService.getComplianceAllotted(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "COM_PEND_REVIEW") {
      this.dashboardService.getCompliancePenReview(this.deptId).subscribe({
        next: (res) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "COM_PEND") {
      this.dashboardService.getCompliancePen(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "RPLY_FILED") {
      this.dashboardService.getReplyFiled(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "RPLY_N_FILED") {
      this.dashboardService.getReplyNotFiled(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters();
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }
    else if (this.type === "RPLY_N_REQ") {
      this.dashboardService.getReplyNotReq(this.deptId).subscribe({
        next: (res: any) => {
          Swal.close()
          this.cases = res || [];
          this.extractUniqueNatures();
          this.clearFilters(); // Set filteredCases base array data
          this.loading = false;
          this.cdr.detectChanges();
        }
      })
    }

    else {
      // Safety handling fallback if dynamic parameter fails all route matching rules
      Swal.close();
      this.loading = false;
    }
  }

  goBack(): void {
    this.router.navigate(['/portal/ccms/adminHome/dashboard']);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  getPageNumbers(): number[] {
    const maxVisiblePages = 10;
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  viewCase(c: any): void {
    console.log('View case:', c);
  }

  openCase(c: any) {
    this.router.navigate([
      '/portal/ccms/adminHome/show_case_details/case-details',
      c.reg_no,
      c.type_name_reg,
      c.reg_year,
      c.cino
    ]);
  }

  onClickAllocate(c: any) {
    this.router.navigate(['/portal/ccms/adminHome/oicAllocate/allot',
      c.reg_no,
      c.type_name_reg,
      c.reg_year,
      c.cino
    ])
  }

}