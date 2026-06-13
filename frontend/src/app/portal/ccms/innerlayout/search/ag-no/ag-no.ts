import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ag-no',
  standalone: false,
  templateUrl: './ag-no.html',
  styleUrl: './ag-no.scss',
})
export class AgNo {

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
  agDetails: any;
  distDetails: any;
  agNumber: any;

  private apiUrl = 'https://ccms-nck9.onrender.com/master'
  private apiUrl2 = 'https://ccms-nck9.onrender.com/home'
  // private apiUrl = 'http://localhost:5000/master'
  // private apiUrl2 = 'http://localhost:5000/home'

  toggleMoreInfo() {
    this.showMoreInfo = !this.showMoreInfo;
  }
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {

    this.http.get<any>(`${this.apiUrl}/doc_type`).subscribe({
      next: (res: any) => { this.docs = res; }
    });
  }

  onSubmit() {
    this.showContainer = false;
    this.cdr.detectChanges();

    this.http.post(`${this.apiUrl2}/caseAgDetails1`, {
      agcino: this.agNumber
    }).subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.agDetails = res[0].ag;
          this.caseDetail = res[0].cd;
          this.distDetails = res[0].d;
          this.showMoreInfo = true;
          this.cdr.detectChanges();
          Swal.fire({
            icon: 'success',
            title: 'Case Found',
            text: `AG Number  ${this.agNumber}  found successfully.`,
            confirmButtonColor: '#4f46e5',
            timer: 2000,          // auto close after 2s
            timerProgressBar: true,
            showConfirmButton: false
          });
        } else {
          // No record found
          Swal.fire({
            icon: 'warning',
            title: 'Not Found',
            text: 'No case found for the given AG Number.',
            confirmButtonColor: '#4f46e5'
          });
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#4f46e5'
        });
        console.error(err);
      }
    });
  }

  reset() {
    this.showContainer = false;
    this.showMoreInfo = false;
    this.caseDetail = null;
  }
}
