import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CaseService } from '../../../../../shared/services/case-service';
import { ActionService } from '../../../../../shared/services/action-service';

@Component({
  selector: 'app-add-new-case',
  standalone: false,
  templateUrl: './add-new-case.html',
  styleUrl: './add-new-case.scss',
})
export class AddNewCase {
  caseType: any[] = [];
  selectedCaseNature: any;
  selectedYear: any;
  caseNumber: any;
  year: any[] = [];
  selectedCourtName: any;
  courts: any[] = ['HIGH COURT OF CHHATTISGARH'];
  data: any[] = [];
  courtName: any;
  cino: any;
  pet_name: any;
  res_name: any;
  showContainer = false;
  dept_id: any
  showbutton = false;
  showText = '';
  case_type_code_from_db: any;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef, private caseService: CaseService,
    private actionService: ActionService
  ) {
    this.dept_id = localStorage.getItem('deptId');
  }

  ngOnInit() {
    this.actionService.getCaseNature().subscribe({
      next: (res) => { this.caseType = res; }, error: (err) => console.error(err)
    });

    this.actionService.getYear().subscribe({
      next: (res) => { this.year = res.reverse(); }
    });
  }

  onSubmit() {
    this.showContainer = false;
    this.cdr.detectChanges();

    Swal.fire({
      title: 'Searching...',
      text: 'Fetching case details, please wait.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.actionService.postCaseDetail(this.selectedCaseNature, this.caseNumber, this.selectedYear,).subscribe({
      next: (res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          this.cino = res[0].cino;
          this.pet_name = res[0].pet_name;
          this.res_name = res[0].res_name;
          this.courtName = res[0].court_est_name;
          this.showContainer = true;
          this.cdr.detectChanges();


          this.actionService.postDeptDetail(this.cino, this.dept_id).subscribe({
            next: (res: any) => {
              if (res.length > 0) {
                this.showText = 'Case Already Added'
                this.showbutton = false;
              } else {
                this.showText = 'Case Found'
                this.showbutton = true;
              }
            }
          })
          Swal.fire({
            icon: 'success',
            title: 'Case Found',
            text: 'Case details loaded successfully.',
            timer: 2000,
            showConfirmButton: false
          });

        } else {
          Swal.close();
          this.showContainer = false;
          const estCode = 'CGHC01';
          this.caseService.getCaseIdByShortCode(this.selectedCaseNature).subscribe({
            next: (res: any) => {
              this.case_type_code_from_db = res[0].case_type
              this.caseService.searchCase(estCode, this.case_type_code_from_db, this.caseNumber, this.selectedYear).subscribe({
                next: (res: any) => {
                  this.showContainer = true;
                  if (res && res.cino) {
                    this.showText = 'Case Found From Napix'
                    this.cino = res.cino;
                    this.pet_name = res.pet_name;
                    this.res_name = res.res_name;
                    this.courtName = res.establishment_name;
                    console.log(this.cino);
                    console.log(this.pet_name);
                    console.log(this.res_name);
                    console.log(this.courtName);
                    alert('is from napix')
                    this.showbutton = true;
                    this.cdr.detectChanges();

                  } else {
                    this.showContainer = false;
                    this.cdr.detectChanges();
                    Swal.fire({
                      icon: 'info',
                      title: 'No Case Found',
                      text: 'No case was found matching the provided details.',
                      confirmButtonText: 'OK'
                    });
                  }
                }
              })

            }
          })
        }
      },
      error: (err) => {
        console.error(err);
        this.showContainer = false;
        this.cdr.detectChanges();
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'An error occurred while fetching case details. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  reset() {
    this.showContainer = false;
  }
}