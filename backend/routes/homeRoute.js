/**
 * @openapi
 * /home/postCaseDetail:
 *   post:
 *     summary: Check case detail
 *     tags:
 *       - Home
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedCaseNature:
 *                 type: string
 *               caseNumber:
 *                 type: string
 *               selectedYear:
 *                 type: string
 *             required:
 *               - selectedCaseNature
 *               - caseNumber
 *               - selectedYear
 *     responses:
 *       200:
 *         description: Case detail response
 * /home/postdeptDetail:
 *   post:
 *     summary: Check department detail
 *     tags:
 *       - Home
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cino:
 *                 type: string
 *               dept_id:
 *                 type: string
 *             required:
 *               - cino
 *               - dept_id
 *     responses:
 *       200:
 *         description: Department detail response
 * /home/upload:
 *   post:
 *     summary: Upload a document file
 *     tags:
 *       - Home
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               doc_id:
 *                 type: string
 *               doc_slno:
 *                 type: string
 *               upload_date:
 *                 type: string
 *                 format: date
 *               cino:
 *                 type: string
 *               remark:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: Document upload result
 *       400:
 *         description: No file uploaded
 * /home/upload/{cino}:
 *   get:
 *     summary: Get uploaded document details by cino
 *     tags:
 *       - Home
 *     parameters:
 *       - in: path
 *         name: cino
 *         schema:
 *           type: string
 *         required: true
 *         description: Case identifier
 *     responses:
 *       200:
 *         description: Document upload details
 * /home/caseAgDetails:
 *   post:
 *     summary: Get case and AG petition details
 *     tags:
 *       - Home
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reg_year:
 *                 type: string
 *               pet_name:
 *                 type: string
 *               reg_no:
 *                 type: string
 *             required:
 *               - reg_year
 *               - pet_name
 *               - reg_no
 *     responses:
 *       200:
 *         description: Case and AG details
 * /home/caseAgDetails1:
 *   post:
 *     summary: Get case and AG petition details by AG CINO
 *     tags:
 *       - Home
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               agcino:
 *                 type: string
 *             required:
 *               - agcino
 *     responses:
 *       200:
 *         description: Case and AG details by AG CINO
 */const express = require('express');
const { handleCheckCaseDetail, handlePostDocumentUpload, handleGetDocumentUploadDetails,
    handleGetCaseAndAGDetails, handleGetCaseAndAGDetails1,
    handleCheckDeptDetail } = require('../controllers/home');
const uploadDocument = require('../middlewares/upload');
const router = express.Router();

router.post('/postCaseDetail', handleCheckCaseDetail);
router.post('/postdeptDetail', handleCheckDeptDetail);

router.post('/upload', uploadDocument.single('file'), handlePostDocumentUpload);
router.get('/upload/:cino', handleGetDocumentUploadDetails);
router.post('/caseAgDetails', handleGetCaseAndAGDetails);

router.post('/caseAgDetails1', handleGetCaseAndAGDetails1);
module.exports = router;