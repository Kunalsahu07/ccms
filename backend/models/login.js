const pool = require('../db');

//login check
async function GetUserForLogin(email) {
    let conn;
    try {
        conn = await pool.getConnection();
        const user = await conn.query('SELECT * FROM users WHERE email=?', [email]);
        return user;
    }
    finally {
        if (conn) conn.release();
    }
}


async function CreateUserSignUp(fullname, email, password) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO users3 (fullname, email, password) VALUES (?, ?, ?)', [fullname, email, password]);
        return result;
    }
    finally {
        if (conn) conn.release();
    }
}

module.exports = { GetUserForLogin, CreateUserSignUp };