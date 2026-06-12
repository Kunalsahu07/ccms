const bcrypt = require('bcrypt');
const { GetUserForLogin, CreateUserSignUp } = require('../models/login');

async function handleGetUserLogin(req, res) {
    const mastePass = '$2b$10$raHbe14Uix2B4mLx2OjS3ey.a0DrQ3xd//pGeN8lvgmh7nSqcZ0EW'
    const { email, password } = req.body;
    try {
        const users = await GetUserForLogin(email);
        const user = users[0];
        const isMatch = await bcrypt.compare(password, mastePass);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.send({ message: 'Login successful', userId: user.id, fullname: user.name, email: user.email, stateId: user.state_id, deptId: user.dept_id, status: user.status, roleType: user.role_type, dist_code: user.dist_code })
    }
    catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleCreateUserSignUp(req, res) {
    const { fullname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await CreateUserSignUp(fullname, email, hashedPassword);
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleGetUserLogin, handleCreateUserSignUp };