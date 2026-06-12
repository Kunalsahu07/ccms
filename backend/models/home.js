const pool = require('../db');

async function GetUser(email) {
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

async function GetAllUsers() {
    let conn;
    try {
        conn = await pool.getConnection();
        const users = await conn.query('SELECT * FROM users');
        return users;
    }
    finally {
        if (conn) conn.release();
    }
}

async function CheckCaseDetail(caseNature, caseNo, caseYear,cino) {
    let conn;
    try {
        conn = await pool.getConnection();
        const users = await conn.query('SELECT cd.*,agt.agcino,agt.reg_no as agtRegNo FROM case_details cd LEFT JOIN ag_petition_t agt ON cd.cino = agt.cino WHERE cd.type_name_reg = ? AND cd.reg_no = ? AND cd.reg_year = ? OR cd.cino = ?', [caseNature, caseNo, caseYear,cino]);
        return users;
    }
    finally {
        if (conn) conn.release();
    }
}

async function CheckDeptDetail(cino, dept_id) {
    let conn;
    try {
        conn = await pool.getConnection();
        const users = await conn.query('SELECT * FROM dept_cases WHERE cino = ? AND dept_id = ?', [cino, dept_id]);
        return users;
    } finally {
        if (conn) conn.release();
    }
}

async function postDocumentUpload(doc_id, doc_slno, file_nm, cino, upload_date, remark) {
    let conn;
    try {
        conn = await pool.getConnection();
        const users = await conn.query('INSERT INTO docu_uploads(doc_id,doc_slno,file_nm,cino,upload_date,remarks) VALUES (?,?,?,?,?,?)', [doc_id, doc_slno, file_nm, cino, upload_date, remark]);
        return users;
    }
    finally {
        if (conn) conn.release();
    }
}

async function getDocumentUploadDetails(cino) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT du.doc_id,du.doc_slno,du.upload_date,du.file_nm,du.remarks,dt.docu_name, du.cino FROM docu_uploads du LEFT JOIN doc_type_t dt ON du.doc_id = dt.id WHERE du.cino = ? ', [cino]);
        return result;
    } finally {
        if (conn) conn.release();
    }

}

async function getCaseAndAGPetitionDetails(pet_name, reg_no, reg_year) {
    let conn;
    try {
        conn = await pool.getConnection();
        const sqlQuery = `
            SELECT cd.*, ag.*
            FROM case_details cd
            INNER JOIN ag_petition_t ag 
                ON cd.cino = ag.cino 
            WHERE cd.pet_name = ? 
              AND cd.reg_no = ? 
              AND cd.reg_year = ?;
        `;

        // Pass everything inside a single configuration object
        const result = await conn.query({
            sql: sqlQuery,
            nestTables: true,                 // Tells the driver to split tables into sub-objects
            values: [pet_name, reg_no, reg_year] // Place your parameters HERE
        });

        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getCaseAndAGPetitionDetails1(agcino) {
    let conn;
    try {
        conn = await pool.getConnection();
        const sqlQuery = `
    SELECT cd.*, ag.*, d.*
    FROM case_details cd
    INNER JOIN ag_petition_t ag 
        ON cd.cino = ag.cino 
    INNER JOIN districts d 
        ON d.dist_code = ag.pet_dist_code
        AND d.state_id = 22
    WHERE ag.agcino = ?
`;

        // Pass everything inside a single configuration object
        const result = await conn.query({
            sql: sqlQuery,
            nestTables: true,                 // Tells the driver to split tables into sub-objects
            values: [agcino] // Place your parameters HERE
        });

        return result;
    } finally {
        if (conn) conn.release();
    }
}



module.exports = {
    GetUser, GetAllUsers, CheckCaseDetail, CheckDeptDetail,
    postDocumentUpload, getDocumentUploadDetails,
    getCaseAndAGPetitionDetails, getCaseAndAGPetitionDetails1
};