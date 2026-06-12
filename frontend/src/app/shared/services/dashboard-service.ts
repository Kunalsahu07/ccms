import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeptwiseDocumentClick } from '../../portal/ccms/innerlayout/report/deptwise-document-click/deptwise-document-click';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // baseUrl = 'http://localhost:5000/dashboard'

  private baseUrl = 'https://ccms-nck9.onrender.com/dashboard'
  constructor(private http: HttpClient) {
  }

  getCaseDetailsForDashboard(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getDetails/${dept_id}`);
  }

  getCaseDetailsForDashboardByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getDetails/${dept_id}/year/${year}`);
  }
  // -------------------------------------------------------------------------

  getCaseTypeDetailsForDashboard(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getCaseTypeDetails/${dept_id}`);
  }

  getCaseTypeDetailsForDashboardByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getCaseTypeDetails/${dept_id}/year/${year}`);
  }
  //  ------------------------------ DASHBOARD CLICK APIS ------------------------------------------------------

  getFullCaseDetailsUsingDeptIdAndPendDisp(dept_id: string, pend_disp: string) {
    return this.http.get<any>(`${this.baseUrl}/getfullcasedetails/department/${dept_id}/pending_disp/${pend_disp}`)
  }

  getFullCaseDetailsUsingDeptIdAndPendDispByYear(dept_id: string, pend_disp: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getfullcasedetails/department/${dept_id}/pending_disp/${pend_disp}/year/${year}`)
  }

  getServiceCaseDetails(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getServiceCaseDetails/${dept_id}`);
  }

  getServiceCaseDetailsByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getServiceCaseDetails/${dept_id}/year/${year}`);
  }

  getCriminalCaseDetails(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getCriminalCaseDetails/${dept_id}`)
  }

  getCriminalCaseDetailsByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getCriminalCaseDetails/${dept_id}/year/${year}`)
  }

  getCivilCaseDetails(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getCivilCaseDetails/${dept_id}`)
  }

  getCivilCaseDetailsByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getCivilCaseDetails/${dept_id}/year/${year}`)
  }

  getContemptCaseDetails(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getContemptCaseDetails/${dept_id}`)
  }

  getContemptCaseDetailsByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getContemptCaseDetails/${dept_id}/year/${year}`)
  }

  getAllCaseDetailsByDeptId(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getAllCaseDetailsByDeptId/${dept_id}`)
  }

  getAllCaseDetailsByDeptIdByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getAllCaseDetailsByDeptId/${dept_id}/year/${year}`)
  }

  // ---------------------------- Case Order Compliance ------------------------------

  getComplianceCount(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getComplianceCount/${dept_id}`);
  }

  getComplianceCountByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getComplianceCount/${dept_id}/year/${year}`);
  }
  getCompliancePen(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getCompliancePen/${dept_id}`)
  }

  getCompliancePenByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getCompliancePen/${dept_id}/year/${year}`)
  }

  getCompliancePenReview(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getCompliancePenReview/${dept_id}`)
  }
  getCompliancePenReviewByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getCompliancePenReview/${dept_id}/year/${year}`)
  }

  getComplianceDone(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceDone/${dept_id}`)
  }

  getComplianceDoneByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceDone/${dept_id}/year/${year}`)
  }

  getComplianceAllotted(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceAllotted/${dept_id}`)
  }

  getComplianceAllottedByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceAllotted/${dept_id}/year/${year}`)
  }
  getComplianceNotAllotted(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceNotAllotted/${dept_id}`)
  }
  getComplianceNotAllottedByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceNotAllotted/${dept_id}/year/${year}`)
  }

  getComplianceNotReq(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceNotReq/${dept_id}`)
  }
  getComplianceNotReqByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceNotReq/${dept_id}/year/${year}`)
  }

  getComplianceReq(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceReq/${dept_id}`)
  }
  getComplianceReqByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getComplianceReq/${dept_id}/year/${year}`)
  }
  // -------------------------------- OIC -----------------------------------------

  getOicCount(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getOicFormalCount/${dept_id}`);
  }
  getOicCountByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getOicFormalCount/${dept_id}/year/${year}`);
  }

  getOicAppointed(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getOicAppointed/${dept_id}`);
  }
  getOicAppointedByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getOicAppointed/${dept_id}/year/${year}`);
  }

  getOicNotAppointed(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getOicNotAppointed/${dept_id}`);
  }
  getOicNotAppointedByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getOicNotAppointed/${dept_id}/year/${year}`);
  }

  getOicNotReq(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getOicNotReq/${dept_id}`);
  }
  getOicNotReqByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getOicNotReq/${dept_id}/year/${year}`);
  }

  getOicFormalParty(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getOicFormalParty/${dept_id}`);
  }
  getOicFormalPartyByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getOicFormalParty/${dept_id}/year/${year}`);
  }

  getOicFwdir(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getOicFwdir/${dept_id}`);
  }
  getOicFwdirByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getOicFwdir/${dept_id}/year/${year}`);
  }

  getOicNoFwdir(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getOicNoFwdir/${dept_id}`);
  }
  getOicNoFwdirByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getOicNoFwdir/${dept_id}/year/${year}`);
  }
  // --------------------------------- Reply -----------------------------------------

  getReplyCountByYear(dept_id: string, year: string) {
    return this.http.get<any>(`${this.baseUrl}/getReplyCount/${dept_id}/year/${year}`);
  }
  getReplyCount(dept_id: string) {
    return this.http.get<any>(`${this.baseUrl}/getReplyCount/${dept_id}`);
  }

  getReplyFiled(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getReplyFiled/${dept_id}`);
  }
  getReplyFiledByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getReplyFiled/${dept_id}/year/${year}`);
  }

  getReplyNotFiled(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getReplyNotFiled/${dept_id}`);
  }
  getReplyNotFiledByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getReplyNotFiled/${dept_id}/year/${year}`);
  }

  getReplyNotReq(dept_id: string) {
    return this.http.get(`${this.baseUrl}/getReplyNotReq/${dept_id}`);
  }
  getReplyNotReqByYear(dept_id: string, year: string) {
    return this.http.get(`${this.baseUrl}/getReplyNotReq/${dept_id}/year/${year}`);
  }



}
