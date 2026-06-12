
/**
 * @openapi
 * /dashboard/getDetails/{dept_id}:
 *   get:
 *     summary: Get dashboard statistics for a department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard details response
 * /dashboard/getDetails/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get dashboard statistics for a department and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dashboard details per year
 * /dashboard/getCaseTypeDetails/{dept_id}:
 *   get:
 *     summary: Get case type details for a department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case type details
 * /dashboard/getCaseTypeDetails/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get case type details for a department and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case type details per year
 * /dashboard/getfullcasedetails/department/{dept_id}/pending_disp/{pend_disp}:
 *   get:
 *     summary: Get full case details by department and pending disposition
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pend_disp
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Full case details
 * /dashboard/getfullcasedetails/department/{dept_id}/pending_disp/{pend_disp}/year/{reg_year}:
 *   get:
 *     summary: Get full case details by department, pending disposition, and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pend_disp
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Full case details per year
 * /dashboard/getAllCaseDetailsByDeptId/{dept_id}:
 *   get:
 *     summary: Get all case details by department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All case details
 * /dashboard/getAllCaseDetailsByDeptId/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get all case details by department and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All case details per year
 * /dashboard/getServiceCaseDetails/{dept_id}:
 *   get:
 *     summary: Get service case details by department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service case details
 * /dashboard/getServiceCaseDetails/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get service case details by department and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Service case details per year
 * /dashboard/getCriminalCaseDetails/{dept_id}:
 *   get:
 *     summary: Get criminal case details by department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Criminal case details
 * /dashboard/getCriminalCaseDetails/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get criminal case details by department and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Criminal case details per year
 * /dashboard/getCivilCaseDetails/{dept_id}:
 *   get:
 *     summary: Get civil case details by department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Civil case details
 * /dashboard/getCivilCaseDetails/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get civil case details by department and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Civil case details per year
 * /dashboard/getContemptCaseDetails/{dept_id}:
 *   get:
 *     summary: Get contempt case details by department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contempt case details
 * /dashboard/getContemptCaseDetails/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get contempt case details by department and year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contempt case details per year
 * /dashboard/getComplianceCount/{dept_id}:
 *   get:
 *     summary: Get compliance count for a department
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compliance count
 * /dashboard/getComplianceCount/{dept_id}/year/{reg_year}:
 *   get:
 *     summary: Get compliance count by year
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: reg_year
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compliance count per year
 */
const express = require('express');
const { cacheMiddleware } = require('../middlewares/cacheMiddleware')
const { handleGetDashboardDetails, handleGetCaseTypeDetails, handleGetFullCaseDetails, handleGetServiceTypeDetails,
    handleGetCriminalTypeDetails, handleGetCivilTypeDetails, handleGetContemptTypeDetails,
    handleGetAllCaseDetailsByDeptId,
    handleGetComplianceCount,
    handleGetReplyCount,
    handleGetOicFormalCount,
    handleGetOicAppointed,
    handleGetOicNotAppointed,
    handleGetOicNotReq,
    handleGetOicFormalParty,
    handleGetOicForwardToDir,
    handleGetOicNotForwardToDir,
    handleGetReplyFiled,
    handleGetReplyNotFiled,
    handleGetReplyNotRequired,
    handleGetCompliancePending,
    handleGetCompliancePendingReview,
    handleGetComplianceDone,
    handleGetComplianceAllotted,
    handleGetComplianceNotAllotted,
    handleGetComplianceNotRequired,
    handleGetComplianceRequired } = require('../controllers/dashboardController');
const router = express.Router();

router.get('/getDetails/:dept_id', cacheMiddleware(), handleGetDashboardDetails);
router.get('/getDetails/:dept_id/year/:reg_year', cacheMiddleware(), handleGetDashboardDetails);

router.get('/getCaseTypeDetails/:dept_id', cacheMiddleware(), handleGetCaseTypeDetails);
router.get('/getCaseTypeDetails/:dept_id/year/:reg_year', cacheMiddleware(), handleGetCaseTypeDetails);

router.get('/getfullcasedetails/department/:dept_id/pending_disp/:pend_disp', cacheMiddleware(), handleGetFullCaseDetails);
router.get('/getfullcasedetails/department/:dept_id/pending_disp/:pend_disp/year/:reg_year', cacheMiddleware(), handleGetFullCaseDetails);

router.get('/getAllCaseDetailsByDeptId/:dept_id', cacheMiddleware(), handleGetAllCaseDetailsByDeptId)
router.get('/getAllCaseDetailsByDeptId/:dept_id/year/:reg_year', cacheMiddleware(), handleGetAllCaseDetailsByDeptId)

router.get('/getServiceCaseDetails/:dept_id', cacheMiddleware(), handleGetServiceTypeDetails);
router.get('/getServiceCaseDetails/:dept_id/year/:reg_year', cacheMiddleware(), handleGetServiceTypeDetails);

router.get('/getCriminalCaseDetails/:dept_id', cacheMiddleware(), handleGetCriminalTypeDetails);
router.get('/getCriminalCaseDetails/:dept_id/year/:reg_year', cacheMiddleware(), handleGetCriminalTypeDetails);

router.get('/getCivilCaseDetails/:dept_id', cacheMiddleware(), handleGetCivilTypeDetails);
router.get('/getCivilCaseDetails/:dept_id/year/:reg_year', cacheMiddleware(), handleGetCivilTypeDetails);

router.get('/getContemptCaseDetails/:dept_id', cacheMiddleware(), handleGetContemptTypeDetails);
router.get('/getContemptCaseDetails/:dept_id/year/:reg_year', cacheMiddleware(), handleGetContemptTypeDetails);

// -----------------------Compliance -----------------------------------------

router.get('/getComplianceCount/:dept_id', cacheMiddleware(), handleGetComplianceCount);
router.get('/getComplianceCount/:dept_id/year/:reg_year', cacheMiddleware(), handleGetComplianceCount)

router.get('/getCompliancePen/:dept_id', cacheMiddleware(), handleGetCompliancePending)
router.get('/getCompliancePen/:dept_id/year/:reg_year', cacheMiddleware(), handleGetCompliancePending)

router.get('/getCompliancePenReview/:dept_id', handleGetCompliancePendingReview)
router.get('/getCompliancePenReview/:dept_id/year/:reg_year', cacheMiddleware(), handleGetCompliancePendingReview)

router.get('/getComplianceDone/:dept_id', handleGetComplianceDone)
router.get('/getComplianceDone/:dept_id/year/:reg_year', cacheMiddleware(), handleGetComplianceDone)

router.get('/getComplianceAllotted/:dept_id', cacheMiddleware(), handleGetComplianceAllotted)
router.get('/getComplianceAllotted/:dept_id/year/:reg_year', cacheMiddleware(), handleGetComplianceAllotted)

router.get('/getComplianceNotAllotted/:dept_id', cacheMiddleware(), handleGetComplianceNotAllotted)
router.get('/getComplianceNotAllotted/:dept_id/year/:reg_year', cacheMiddleware(), handleGetComplianceNotAllotted)

router.get('/getComplianceNotReq/:dept_id', cacheMiddleware(), handleGetComplianceNotRequired)
router.get('/getComplianceNotReq/:dept_id/year/:reg_year', cacheMiddleware(), handleGetComplianceNotRequired)

router.get('/getComplianceReq/:dept_id', cacheMiddleware(), handleGetComplianceRequired)
router.get('/getComplianceReq/:dept_id/year/:reg_year', cacheMiddleware(), handleGetComplianceRequired)
// ------------------------Reply----------------------------------------------------


router.get('/getReplyCount/:dept_id', cacheMiddleware(), handleGetReplyCount)
router.get('/getReplyCount/:dept_id/year/:reg_year', cacheMiddleware(), handleGetReplyCount)

router.get('/getReplyFiled/:dept_id', cacheMiddleware(), handleGetReplyFiled)
router.get('/getReplyFiled/:dept_id/year/:reg_year', cacheMiddleware(), handleGetReplyFiled)

router.get('/getReplyNotFiled/:dept_id', cacheMiddleware(), handleGetReplyNotFiled)
router.get('/getReplyNotFiled/:dept_id/year/:reg_year', cacheMiddleware(), handleGetReplyNotFiled)

router.get('/getReplyNotReq/:dept_id', cacheMiddleware(), handleGetReplyNotRequired)
router.get('/getReplyNotReq/:dept_id/year/:reg_year', cacheMiddleware(), handleGetReplyNotRequired)
// ------------------------------- OIC----------------------------------

router.get('/getOicFormalCount/:dept_id', cacheMiddleware(), handleGetOicFormalCount);
router.get('/getOicFormalCount/:dept_id/year/:reg_year', cacheMiddleware(), handleGetOicFormalCount);

router.get('/getOicAppointed/:dept_id', cacheMiddleware(), handleGetOicAppointed)
router.get('/getOicAppointed/:dept_id/year/:reg_year', cacheMiddleware(), handleGetOicAppointed)

router.get('/getOicNotAppointed/:dept_id/year/:reg_year', cacheMiddleware(), handleGetOicNotAppointed)
router.get('/getOicNotAppointed/:dept_id', cacheMiddleware(), handleGetOicNotAppointed)

router.get('/getOicNotReq/:dept_id/year/:reg_year', cacheMiddleware(), handleGetOicNotReq)
router.get('/getOicNotReq/:dept_id', cacheMiddleware(), handleGetOicNotReq)

router.get('/getOicFormalParty/:dept_id', cacheMiddleware(), handleGetOicFormalParty)
router.get('/getOicFormalParty/:dept_id/year/:reg_year', cacheMiddleware(), handleGetOicFormalParty)

router.get('/getOicFwdir/:dept_id', cacheMiddleware(), handleGetOicForwardToDir)
router.get('/getOicFwdir/:dept_id/year/:reg_year', cacheMiddleware(), handleGetOicForwardToDir)

router.get('/getOicNoFwdir/:dept_id', cacheMiddleware(), handleGetOicNotForwardToDir)
router.get('/getOicNoFwdir/:dept_id/year/:reg_year', cacheMiddleware(), handleGetOicNotForwardToDir)


module.exports = router;