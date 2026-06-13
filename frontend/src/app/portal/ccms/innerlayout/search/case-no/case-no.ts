import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-case-no',
  standalone: false,
  templateUrl: './case-no.html',
  styleUrl: './case-no.scss',
})
export class CaseNo {

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
  showMoreInfo = false;
  caseDetail: any = null; // assign your full API response here

  toggleMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
  }
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) { }
  private apiUrl = 'https://ccms-nck9.onrender.com/master'
  private apiUrl2 = 'https://ccms-nck9.onrender.com/home'
  // private apiUrl = 'http://localhost:5000/master'
  // private apiUrl2 = 'http://localhost:5000/home'


  ngOnInit() {
    this.http.get<any>(`${this.apiUrl}/case_nature`).subscribe({
      next: (res) => { this.caseType = res; },
      error: (err) => console.error(err)
    });

    this.http.get<any>(`${this.apiUrl}/year`).subscribe({
      next: (res) => { this.year = res.reverse(); }
    });

    this.http.get<any>(`${this.apiUrl}/doc_type`).subscribe({
      next: (res: any) => { this.docs = res; }
    });
  }

  onSubmit() {
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

    this.http.post<any>(`${this.apiUrl2}/postCaseDetail`, {
      selectedCaseNature: this.selectedCaseNature,
      caseNumber: this.caseNumber,
      selectedYear: this.selectedYear
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
          this.http.get(`${this.apiUrl2}/upload/${this.cino}`).subscribe({
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
          this.http.post(`${this.apiUrl2}/caseAgDetails`, {
            pet_name: this.pet_name,
            reg_no: this.case_number,
            reg_year: this.reg_year
          }).subscribe({
            next: (res: any) => {
              console.log(res);        // check full response
              console.log(res[0]);     // check first element

              if (res && res[0] && res[0].ag) {
                this.agno = res[0].ag.agcino;
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
}
