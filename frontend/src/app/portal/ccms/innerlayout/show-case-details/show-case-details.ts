import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-case-details',
  standalone: false,
  templateUrl: './show-case-details.html',
  styleUrl: './show-case-details.scss',
})

export class ShowCaseDetails {

  caseType: any[] = [];
  selectedCaseNature: any;
  selectedYear: any;
  caseNumber: any;
  year: any[] = [];
  selectedCourtName: any;
  courtName: any;
  cino: any;
  pet_name: any;
  res_name: any;
  showContainer = false;
  case_type_name: any;
  case_number: any;
  selectedDocType: any;
  docs: any[] = [];
  doc_no: any;
  doc_date: any;
  remark: any;
  data: any[] = [];
  selectedFile: File | null = null;
  uploadedPath = '';
  pet_adv: any
  res_adv: any
  lastHearing: any;
  reg_year: any;
  agno: any;
  showMoreInfo = true;
  caseDetail: any = null; // assign your full API response here
  activeTab = 0;
  setTab(i: number) { this.activeTab = i; }
  toggleMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
  }
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const regNo = this.route.snapshot.paramMap.get('reg_no');
    const caseType = this.route.snapshot.paramMap.get('case_type');
    const regYear = this.route.snapshot.paramMap.get('reg_year');
    const ciNo = this.route.snapshot.paramMap.get('cino_no');
    console.log(ciNo);
    this.onSubmit(regNo, caseType, regYear, ciNo);
  }

  onSubmit(regNo: string | null, caseType: string | null, regYear: string | null, cino: string | null) {
    this.showContainer = false;
    this.cdr.detectChanges();

    // Show loading alert
    Swal.fire({
      title: 'Searching...',
      text: 'Fetching case details, please wait.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.http.post<any>('http://localhost:5000/home/postCaseDetail', {
      selectedCaseNature: caseType,
      caseNumber: regNo,
      selectedYear: regYear,
      cino: cino
    }).subscribe({
      next: (res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          this.cino = res[0].cino;
          this.pet_name = res[0].pet_name;
          this.res_name = res[0].res_name;
          this.courtName = res[0].court_est_name;
          this.case_type_name = res[0].type_name_reg;
          this.case_number = res[0].reg_no;
          this.pet_adv = res[0].pet_adv;
          this.res_adv = res[0].res_adv;
          this.lastHearing = res[0].date_last_list;
          this.caseDetail = res[0];
          this.reg_year = res[0].reg_year;
          this.showContainer = true;
          this.cdr.detectChanges();

          // Fetch upload details after getting cino
          this.http.get(`http://localhost:5000/home/upload/${this.cino}`).subscribe({
            next: (uploadRes: any) => {
              this.data = uploadRes;
              this.cdr.detectChanges();
              this
              Swal.fire({
                icon: 'success',
                title: 'Case Found',
                text: 'Case details loaded successfully.',
                timer: 2000,
                showConfirmButton: false
              });
            },
            error: (err) => {
              console.error(err);
              Swal.fire({
                icon: 'warning',
                title: 'Case Found',
                text: 'Case details loaded, but could not fetch upload history.',
                confirmButtonText: 'OK'
              });
            }
          });
          // Fix the order to match backend: (pet_name, reg_no, reg_year)
          this.http.post('http://localhost:5000/home/caseAgDetails', {
            pet_name: this.pet_name,
            reg_no: this.case_number,
            reg_year: this.reg_year
          }).subscribe({
            next: (res: any) => {
              if (res && res[0] && res[0].ag) {
                this.agno = res[0].ag.agcino;
                this.cdr.detectChanges();
              } else {
                console.log('ag not found in response');
              }
            },
            error: (err) => console.error(err)
          });

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
    this.showMoreInfo = false;  // ← ADD THIS
    this.caseDetail = null;     // ← ADD THIS
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  goBack() {
    this.location.back();
  }
}
