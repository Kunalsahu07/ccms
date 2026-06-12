import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CaseService {
  // private apiUrl = 'http://localhost:5000/case/search-case';
  // private baseUrl = 'http://localhost:5000'
  private apiUrl = 'https://ccms-nck9.onrender.com/case/search-case';
  private baseUrl = 'https://ccms-nck9.onrender.com'


  constructor(private http: HttpClient) {

  }

  searchCase(estCode: string, caseType: string, regNo: string, regYear: string) {
    const params = new HttpParams()
      .set('est_code', estCode)
      .set('case_type', caseType)
      .set('reg_no', regNo)
      .set('reg_year', regYear);
    return this.http.get(this.apiUrl, { params });
  }

  getCaseIdByShortCode(code_type: string) {
    return this.http.get<any>(`${this.baseUrl}/master/case_nature/${code_type}`);
  }

}
