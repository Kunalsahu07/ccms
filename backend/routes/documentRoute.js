/**
 * @openapi
 * /document/upload:
 *   post:
 *     summary: Upload a document file
 *     tags:
 *       - Document
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: No file uploaded
 */
// routes/documentRoute.js
const express = require('express');
const router = express.Router();
const uploadDocument = require('../middlewares/upload'); // your multer file

router.post('/upload', uploadDocument.single('file'), (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
        message: 'File uploaded successfully',
        filename: req.file.filename,
        path: `/documents/${req.file.filename}`
    });
});

module.exports = router;