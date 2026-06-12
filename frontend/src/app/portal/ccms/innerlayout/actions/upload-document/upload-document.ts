import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Documentservice } from '../../../../../shared/services/documentservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-document',
  standalone: false,
  templateUrl: './upload-document.html',
  styleUrl: './upload-document.scss',
})
export class UploadDocument {

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

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private docService: Documentservice
  ) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:5000/master/case_nature').subscribe({
      next: (res) => { this.caseType = res; },
      error: (err) => console.error(err)
    });

    this.http.get<any>('http://localhost:5000/master/year').subscribe({
      next: (res) => { this.year = res.reverse(); }
    });

    this.http.get<any>('http://localhost:5000/master/doc_type').subscribe({
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

    this.http.post<any>('http://localhost:5000/home/postCaseDetail', {
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
          this.showContainer = true;
          this.cdr.detectChanges();

          // Fetch upload details after getting cino
          this.http.get(`http://localhost:5000/home/upload/${this.cino}`).subscribe({
            next: (uploadRes: any) => {
              this.data = uploadRes;
              this.cdr.detectChanges();
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

  onUpload() {
    if (!this.selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'No File Selected',
        text: 'Please select a file before uploading.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('doc_id', this.selectedDocType);
    formData.append('doc_slno', this.doc_no);
    formData.append('cino', this.cino);
    formData.append('upload_date', this.doc_date);
    formData.append('remark', this.remark);

    // Show loading alert
    Swal.fire({
      title: 'Uploading...',
      text: 'Your document is being uploaded, please wait.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.docService.uploadDocument(formData).subscribe({
      next: (res: any) => {
        this.cdr.detectChanges();
        Swal.fire({
          icon: 'success',
          title: 'Uploaded Successfully',
          timer: 2500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.cdr.detectChanges();
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: err?.message || 'Something went wrong during the upload. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  reset() {
    this.showContainer = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
}