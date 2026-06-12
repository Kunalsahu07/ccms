/**
 * @openapi
 * /master/case_nature:
 *   get:
 *     summary: Get case nature list
 *     tags:
 *       - Master
 *     responses:
 *       200:
 *         description: Case nature list
 * /master/case_nature/{case_type_code}:
 *   get:
 *     summary: Get case nature by case type code
 *     tags:
 *       - Master
 *     parameters:
 *       - in: path
 *         name: case_type_code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Case nature by code
 * /master/year:
 *   get:
 *     summary: Get years list
 *     tags:
 *       - Master
 *     responses:
 *       200:
 *         description: Years list
 * /master/doc_type:
 *   get:
 *     summary: Get document types
 *     tags:
 *       - Master
 *     responses:
 *       200:
 *         description: Document types
 * /master/onboardingDepts:
 *   get:
 *     summary: Get onboarding departments
 *     tags:
 *       - Master
 *     responses:
 *       200:
 *         description: Onboarding departments
 */
const express = require('express');
const { handleGetCaseNature, handleGetYear, handleGetDocType, handleGetDeptNamesOnboardings, handleGetCaseNatureIDbyCodeTypeCode } = require('../controllers/master');

const router = express.Router();

router.get('/case_nature', handleGetCaseNature);
router.get('/case_nature/:case_type_code', handleGetCaseNatureIDbyCodeTypeCode)
router.get('/year', handleGetYear)
router.get('/doc_type', handleGetDocType)
router.get('/onboardingDepts', handleGetDeptNamesOnboardings);

module.exports = router;