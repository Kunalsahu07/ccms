/**
 * @openapi
 * /test:
 *   post:
 *     summary: Test endpoint for password update logic
 *     tags:
 *       - Test
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request processed
 */
const handleUpdatePassword = require('../controllers/testController');
const express = require('express');
const router = express.Router();



router.post('/', handleUpdatePassword);
module.exports = router;



