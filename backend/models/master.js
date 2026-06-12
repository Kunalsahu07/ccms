const pool = require('../db');

async function GetCaseNature() {

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM case_type_m')
        return result;
    }
    finally {
        if (conn) conn.release();
    }

}
async function GetCaseNature2(case_type_code) {

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT case_type FROM case_type_m WHERE case_type_code = ?', [case_type_code])
        return result;
    }
    finally {
        if (conn) conn.release();
    }

}


async function GetYear() {

    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM mas_year')
        return result;
    }
    finally {
        if (conn) conn.release();
    }

}

async function GetDocType() {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM doc_type_t')
        return result;
    }
    finally {
        if (conn) conn.release();
    }

}

async function GetDeptNamesOnboardings() {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM dept_master')
        return result;
    }
    finally {
        if (conn) conn.release();
    }
}



module.exports = { GetCaseNature, GetYear, GetDocType, GetDeptNamesOnboardings, GetCaseNature2 }