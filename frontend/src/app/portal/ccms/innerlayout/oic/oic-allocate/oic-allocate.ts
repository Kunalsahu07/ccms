import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActionService } from '../../../../../shared/services/action-service';

@Component({
  selector: 'app-oic-allocate',
  standalone: false,
  templateUrl: './oic-allocate.html',
  styleUrl: './oic-allocate.scss',
})
export class OicAllocate {
  selectedCaseNature: any;
  caseDetails: any;
  caseType: any;
  caseNo: any;
  caseYear: any;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
    private actionService: ActionService
  ) { }


  ngOnInit() {
    const regNo = this.route.snapshot.paramMap.get('reg_no');
    const caseType = this.route.snapshot.paramMap.get('case_type');
    const regYear = this.route.snapshot.paramMap.get('reg_year');
    const ciNo = this.route.snapshot.paramMap.get('cino_no');
    if (regNo && caseType && regYear && ciNo) {
      this.loadData(regNo, caseType, regYear, ciNo);
    }
  }

  loadData(regNo: string, caseType: string, regYear: string, ciNo: string) {
    this.actionService.postCaseDetail1(caseType, regNo, regYear, ciNo
    ).subscribe({
      next: (res: any) => {
        if (Array.isArray(res) && res.length > 0) {
          this.caseDetails = res[0];
          this.caseType = this.caseDetails.type_name_fil;
          this.caseNo = this.caseDetails.reg_no;
          this.caseYear = this.caseDetails.reg_year;

          console.log('OIC ALLOTed : ', this.caseDetails);
          this.cdr.detectChanges();
        }
      }
    })
  }

}
