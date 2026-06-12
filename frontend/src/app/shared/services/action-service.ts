import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private baseUrl = 'http://localhost:5000';


  constructor(private http: HttpClient) {

  }

  getCaseNature() {
    return this.http.get<any>(`${this.baseUrl}/master/case_nature`);
  }

  getYear() {
    return this.http.get<any>(`${this.baseUrl}/master/year`);
  }

  postCaseDetail(selectedCaseNature: string, caseNumber: string, selectedYear: string) {
    return this.http.post(`${this.baseUrl}/home/postCaseDetail`, { selectedCaseNature, caseNumber, selectedYear });
  }
  postCaseDetail1(selectedCaseNature: string, caseNumber: string, selectedYear: string, cino: string) {
    return this.http.post(`${this.baseUrl}/home/postCaseDetail`, { selectedCaseNature, caseNumber, selectedYear, cino });
  }
  postDeptDetail(cino: string, dept_id: string) {
    return this.http.post<any>(`${this.baseUrl}/home/postdeptDetail`, { cino, dept_id });
  }
}
