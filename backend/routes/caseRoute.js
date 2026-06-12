/**
 * @openapi
 * /case/search-case:
 *   get:
 *     summary: Search case by query parameters
 *     tags:
 *       - Case
 *     parameters:
 *       - in: query
 *         name: est_code
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: case_type
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: reg_no
 *         schema:
 *           type: string
 *         required: true
 *       - in: query
 *         name: reg_year
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Case search results
 *       400:
 *         description: Missing required query parameter
 *       404:
 *         description: Record not found
 */
const express = require('express');
const router = express.Router();
const { searchCase } = require('../services/napix.service');

router.get('/search-case', async (req, res) => {
    const { est_code, case_type, reg_no, reg_year } = req.query;

    if (!est_code || !case_type || !reg_no || !reg_year) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const data = await searchCase({
            estCode: est_code,
            caseType: case_type,
            regNo: reg_no,
            regYear: reg_year
        });

        if (!data) return res.status(404).json({ message: 'Record Not Found !!' });

        return res.status(200).json({
            establishment_name: data.establishment_name,
            cino: data.casenos?.case1?.cino,
            pet_name: data.casenos?.case1?.pet_name,
            res_name: data.casenos?.case1?.res_name,
        });
    } catch (err) {
        console.error(err?.response?.data || err.message);
        return res.status(500).json({
            message: 'Internal Server Error',
            detail: err?.response?.data || err.message
        });
    }
});

module.exports = router;