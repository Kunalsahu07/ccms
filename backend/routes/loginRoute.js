/**
 * @openapi
 * /login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 * /login/signup:
 *   post:
 *     summary: Create a new user account
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - fullname
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
const express = require('express');
const { handleGetUserLogin, handleCreateUserSignUp } = require('../controllers/login');
const router = express.Router();

router.post('/', handleGetUserLogin);
router.post('/signup', handleCreateUserSignUp);
module.exports = router;