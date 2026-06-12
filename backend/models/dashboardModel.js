const pool = require('../db');
const { param } = require('../routes/dashboardRoute');

async function getDashboardStatsDetails(dept_id, reg_year) {
    let conn;
    try {
        conn = await pool.getConnection();
        let query1 = `SELECT count(*)as total_cases FROM dept_cases dc JOIN case_details cd ON cd.cino = dc.cino WHERE dc.dept_id = ?`
        let query2 = `SELECT count(dc.cino)as pending_cases FROM case_details cd JOIN dept_cases dc ON dc.cino = cd.cino WHERE dc.dept_id=? AND cd.pend_disp ='P'`
        let query3 = `SELECT COUNT(dc.cino)as disposed_cases FROM case_details cd JOIN dept_cases dc ON dc.cino = cd.cino WHERE dc.dept_id=? AND cd.pend_disp ='D'`
        const params = [dept_id];

        if (reg_year) {
            query1 += ` AND cd.reg_year = ?`;
            query2 += ` AND cd.reg_year = ?`;
            query3 += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }

        const totalCase = await conn.query(query1, params);
        const pending = await conn.query(query2, params);
        const disposed = await conn.query(query3, params);

        return {
            pending: pending[0],
            totalCase: totalCase[0],
            disposedCase: disposed[0]
        };
    } finally {
        if (conn) conn.release();
    }
}

async function getCaseTypeStatsDetails(dept_id, reg_year) {
    let conn;
    try {

        let query = `SELECT COUNT(CASE WHEN ctm.flag_type = 1 AND ctm.case_type_code NOT IN('CONT') THEN 1 END) AS civil_cases,COUNT(CASE WHEN ctm.flag_type = 2 
        AND ctm.case_type_code NOT IN('CONTR') THEN 1 END) AS criminal_cases,COUNT(CASE WHEN ctm.flag_type = 3 AND ctm.case_type_code IN('WPS') THEN 1 END) AS service_cases,
        COUNT(CASE WHEN ctm.case_type_code IN('CONT') THEN 1 END) AS contempt_cases FROM case_details cd JOIN dept_cases dc ON dc.cino = cd.cino JOIN case_type_m ctm ON ctm.case_type = cd.case_type_id 
        WHERE dc.dept_id = ? AND cd.pend_disp = 'P'`

        const params = [dept_id];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }

        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getFullCaseDetails(dept_id, pend_disp, reg_year) {
    let conn;
    try {
        conn = await pool.getConnection();

        let query = `SELECT cd.*, ctm.type_name, dc.status 
                     FROM case_details cd 
                     JOIN dept_cases dc ON dc.cino = cd.cino 
                     JOIN case_type_m ctm ON ctm.case_type = cd.case_type_id 
                     WHERE dc.dept_id = ? AND cd.pend_disp = ?`;
        const params = [dept_id, pend_disp];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;  // change cd.reg_year to your actual date column
            params.push(reg_year);
        }

        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getAllCaseDetailsByDeptId(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT cd.* FROM dept_cases dc JOIN case_details cd ON cd.cino = dc.cino WHERE dept_id = ? `;
        const params = [dept_id];
        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getServiceTypeDetails(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT cd.* FROM case_details cd JOIN dept_cases dc ON dc.cino = cd.cino JOIN case_type_m ctm ON ctm.case_type_code = cd.type_name_reg WHERE dc.dept_id = ? AND cd.pend_disp = 'P' AND ctm.flag_type = 3`;
        const params = [dept_id]

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;  // change cd.reg_year to your actual date column
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getCriminalTypeDetails(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT cd.* FROM case_details cd JOIN dept_cases dc ON dc.cino = cd.cino JOIN case_type_m ctm ON ctm.case_type_code = cd.type_name_reg WHERE dc.dept_id=? AND cd.pend_disp ='P' AND ctm.flag_type = 2 AND ctm.case_type_code NOT IN ('CONTR')`;
        const params = [dept_id];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }

        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getCivilTypeDetails(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT cd.* FROM case_details cd JOIN dept_cases dc ON dc.cino = cd.cino JOIN case_type_m ctm ON ctm.case_type_code = cd.type_name_reg WHERE dc.dept_id = ? AND cd.pend_disp = 'P' AND ctm.flag_type = 1 AND ctm.case_type_code NOT IN ('CONT','CONC','CONTS')`;
        const params = [dept_id];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getContemptTypeDetails(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT cd.* FROM case_details cd JOIN dept_cases dc ON dc.cino = cd.cino JOIN case_type_m ctm ON ctm.case_type_code = cd.type_name_reg WHERE dc.dept_id=? AND cd.pend_disp ='P' AND ctm.case_type_code IN ('CONT')`;
        const params = [dept_id];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getComplianceCount(dept_id, reg_year) {
    let conn;
    try {
        let query = `
SELECT 
    COUNT(DISTINCT CASE WHEN ocm.is_compl_required = 'Y' AND ocm.act_compliance_by = 8 AND ocm.status = 'O' THEN dcs.cino END) AS court_order_compliance_open,
    COUNT(DISTINCT CASE WHEN ocm.is_compl_required = 'Y' AND ocm.status = 'O' AND ocd.comp_status = 'C' THEN dcs.cino END) AS corder_comp_pend_for_review,
    COUNT(DISTINCT CASE WHEN ocm.is_compl_required = 'Y' AND ocm.status = 'C' THEN dcs.cino END) AS court_order_compliance_close,
    COUNT(DISTINCT CASE WHEN ocm.is_compl_required = 'Y' AND ocm.status = 'O' AND ocd.comp_status = 'O' THEN dcs.cino END) AS court_order_compliance_total,
    COUNT(DISTINCT CASE WHEN ocm.is_compl_required IS NULL THEN dcs.cino END) AS court_order_compliance_not_alloted,
    COUNT(DISTINCT CASE WHEN ocm.is_compl_required = 'N' THEN dcs.cino END) AS compNoReq,
    COUNT(DISTINCT CASE WHEN ocm.is_compl_required = 'Y' THEN dcs.cino END) AS compReq,
    COUNT(DISTINCT CASE WHEN ocm.act_due_dt <= CURRENT_DATE + INTERVAL 10 DAY AND ocm.act_due_dt >= CURRENT_DATE THEN dcs.cino END) AS upCont
FROM dept_cases dcs
LEFT JOIN (
    SELECT cino, dept_id, MAX(ord_comp_id) as ord_comp_id, MAX(is_compl_required) as is_compl_required, MAX(status) as status, MAX(act_compliance_by) as act_compliance_by, MAX(act_due_dt) as act_due_dt
    FROM order_compliance_m
    GROUP BY cino, dept_id
) ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id
LEFT JOIN order_compliance_details ocd ON ocm.ord_comp_id = ocd.ord_comp_id
LEFT JOIN case_details cd ON cd.cino = dcs.cino
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'D'`

        const params = [dept_id];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }
        conn = await pool.getConnection()
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release()
    }
}

async function getReplyCount(dept_id, reg_year) {

    let conn;
    try {
        let query = `
SELECT 
    COUNT(DISTINCT CASE WHEN ac.act_status IN ('C','P') THEN dcs.cino END) AS reply_filed,
    COUNT(DISTINCT CASE WHEN ac.act_status = 'O' THEN dcs.cino END) AS pending_reply_filed,
    COUNT(DISTINCT CASE WHEN ac.act_status = 'N' THEN dcs.cino END) AS reply_not_required,
    COUNT(DISTINCT CASE WHEN ac.act_status IN ('O','C','P','N') THEN dcs.cino END) AS total_alloted,
    COUNT(DISTINCT CASE WHEN ac.act_status IS NULL THEN dcs.cino END) AS pending_for_total_alloted
FROM dept_cases dcs
LEFT JOIN activity_compliance ac ON dcs.act_tran_id = ac.act_tran_id
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = 5
JOIN case_details cd ON cd.cino = dcs.cino
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
  AND fp.cino IS NULL 
  AND cnr.cino IS NULL                                            
  `
        const params = [dept_id]
        if (reg_year) {
            query += `AND cd.reg_year = ?`;
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    }
    finally {
        if (conn) conn.release();
    }
}


async function getOicFormalCount(dept_id, reg_year) {
    let conn;
    try {
        // Removed trailing semicolons so string concatenation for reg_year works perfectly
        let query = `SELECT 
    COUNT(DISTINCT CASE WHEN cnr.cino IS NOT NULL AND fp.cino IS NULL THEN dcs.cino END) AS compliance_not_required,
    COUNT(DISTINCT CASE WHEN fp.dept_id = ? THEN dcs.cino END) AS fParty,
    COUNT(DISTINCT CASE WHEN (uu.name IS NOT NULL OR twd.cino IS NOT NULL) THEN dcs.cino END) AS fwdDir,
    COUNT(DISTINCT CASE WHEN (uu.name IS NULL AND twd.cino IS NULL) THEN dcs.cino END) AS nFwdDir
FROM dept_cases dcs
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = ?
LEFT JOIN users uu ON uu.role_type = 'DIR' COLLATE utf8mb4_uca1400_ai_ci 
    AND (uu.id = dcs.user_id OR uu.id = dcs.to_user_id)
LEFT JOIN (
    SELECT cino, dept_id,
           ROW_NUMBER() OVER(PARTITION BY cino ORDER BY created_at DESC) as rn
    FROM take_up_with_dir
) twd ON twd.cino = dcs.cino AND twd.dept_id = dcs.dept_id AND twd.rn = 1
LEFT JOIN case_details cd ON cd.cino = dcs.cino
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'`;

        let query2 = `SELECT 
    COUNT(DISTINCT dcs.cino) AS pending_for_total_alloted
FROM dept_cases dcs
LEFT JOIN activity_compliance ac ON dcs.act_tran_id = ac.act_tran_id   
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = ?
LEFT JOIN case_details cd ON cd.cino = dcs.cino
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
  AND ac.act_status IS NULL   
  AND fp.cino IS NULL   
  AND cnr.cino IS NULL`;

        const params = [dept_id, dept_id, dept_id];
        const params2 = [dept_id, dept_id];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            query2 += ` AND cd.reg_year = ?`;

            params.push(reg_year);
            params2.push(reg_year);
        }

        conn = await pool.getConnection();

        // Execute queries concurrently using Promise.all for better performance
        const [result, result2] = await Promise.all([
            conn.query(query, params),
            conn.query(query2, params2)
        ]);

        // Return structured dataset properties cleanly 
        return {
            OicCounts: result[0] || {},
            pending_alloted: result2[0] || {}
        };

    } catch (error) {
        console.error("Database tracking error in getOicFormalCount:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function getOicAppointed(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
 DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN activity_compliance ac ON dcs.act_tran_id = ac.act_tran_id
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = ?
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'P'
  AND ac.act_status IN ('O', 'C', 'P', 'N')
  AND fp.cino IS NULL 
  AND cnr.cino IS NULL
`
        const params = [dept_id, dept_id];

        if (reg_year) {
            query += ` AND cd.reg_year = ?`;
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;

    } catch (error) {
        console.error("Database tracking error in getOicFormalCount:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function getOicNotAppointed(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
   DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN activity_compliance ac ON dcs.act_tran_id = ac.act_tran_id
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = ?
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'P'
  AND ac.act_status IS NULL
  AND fp.cino IS NULL 
  AND cnr.cino IS NULL`
        const params = [dept_id, dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ? `;
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;

    } catch (error) {
        console.error("Database tracking error in getOicFormalCount:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function getOicNotReq(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    DISTINCT (dcs.cino)AS dcscino,cd.*
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
INNER JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = dcs.dept_id
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
  AND fp.cino IS NULL`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ? `
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } catch (error) {
        console.error("Database tracking error in getOicFormalCount:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function getOicFormalParty(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    DISTINCT (dcs.cino)AS dcscino,cd.*
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
INNER JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ? `
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } catch (error) {
        console.error("Database tracking error in getOicFormalCount:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function getOicForwardToDir(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
DISTINCT (dcs.cino)AS dcscino,cd.*
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN users uu ON uu.role_type = 'DIR' AND (uu.id = dcs.user_id OR uu.id = dcs.to_user_id)
LEFT JOIN (
    SELECT cino, dept_id,
           ROW_NUMBER() OVER(PARTITION BY cino ORDER BY created_at DESC) as rn
    FROM take_up_with_dir
) twd ON twd.cino = dcs.cino AND twd.dept_id = dcs.dept_id AND twd.rn = 1
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
  AND (uu.name IS NOT NULL OR twd.cino IS NOT NULL)
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ? `
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } catch (error) {
        console.error("Database tracking error in getOicFormalCount:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function getOicNotForwardToDir(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    DISTINCT (dcs.cino)as dcscino,cd.*
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN users uu ON uu.role_type = 'DIR' AND (uu.id = dcs.user_id OR uu.id = dcs.to_user_id)
LEFT JOIN (
    SELECT cino, dept_id,
           ROW_NUMBER() OVER(PARTITION BY cino ORDER BY created_at DESC) as rn
    FROM take_up_with_dir
) twd ON twd.cino = dcs.cino AND twd.dept_id = dcs.dept_id AND twd.rn = 1
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
  AND uu.name IS NULL 
  AND twd.cino IS NULL
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ? `
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } catch (error) {
        console.error("Database tracking error in getOicFormalCount:", error);
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

async function getReplyFiled(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
 DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN activity_compliance ac ON dcs.act_tran_id = ac.act_tran_id
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = ?
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
  AND ac.act_status IN ('C', 'P')
  AND fp.cino IS NULL 
  AND cnr.cino IS NULL
`
        const params = [dept_id, dept_id]

        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getReplyNotFiled(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
   DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN activity_compliance ac ON dcs.act_tran_id = ac.act_tran_id
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = ?
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'P'
  AND ac.act_status = 'O'
  AND fp.cino IS NULL 
  AND cnr.cino IS NULL
`
        const params = [dept_id, dept_id]

        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getReplyNotRequired(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN activity_compliance ac ON dcs.act_tran_id = ac.act_tran_id
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN formal_party fp ON fp.cino = dcs.cino AND fp.dept_id = dcs.dept_id
LEFT JOIN compliance_not_required cnr ON dcs.cino = cnr.cino AND cnr.dept_id = ?
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'P'
  AND ac.act_status = 'N'
  AND fp.cino IS NULL 
  AND cnr.cino IS NULL
`
        const params = [dept_id, dept_id]

        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getCompliancePending(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
INNER JOIN order_compliance_m ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'D'
  AND ocm.is_compl_required = 'Y' 
  AND ocm.act_compliance_by = 8 
  AND ocm.status = 'O'
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getCompliancePendingReview(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
INNER JOIN order_compliance_m ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id
INNER JOIN order_compliance_details ocd ON ocm.ord_comp_id = ocd.ord_comp_id
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'D'
  AND ocm.is_compl_required = 'Y' 
  AND ocm.status = 'O' 
  AND ocd.comp_status = 'C'
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getComplianceDone(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
INNER JOIN order_compliance_m ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'D'
  AND ocm.is_compl_required = 'Y' 
  AND ocm.status = 'C'
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getComplianceAllotted(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
     DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
INNER JOIN order_compliance_m ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id
INNER JOIN order_compliance_details ocd ON ocm.ord_comp_id = ocd.ord_comp_id
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'D'
  AND ocm.is_compl_required = 'Y' 
  AND ocm.status = 'O' 
  AND ocd.comp_status = 'O'
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getComplianceNotAllotted(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
     DISTINCT(dcs.cino) AS dcscino,cd.* 
FROM dept_cases dcs
INNER JOIN case_details cd ON cd.cino = dcs.cino
LEFT JOIN order_compliance_m ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id
WHERE dcs.dept_id = ? 
  AND cd.pend_disp = 'D'
  AND ocm.is_compl_required IS NULL
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getComplianceNotRequired(dept_id, reg_year) {
    let conn;
    try {
        let query = `SELECT 
    cd.*,
    ocm.is_compl_required,
    ocm.status AS compliance_status,
    ocm.act_due_dt
FROM dept_cases dcs
INNER JOIN (
    SELECT 
        cino, 
        dept_id, 
        MAX(ord_comp_id) as ord_comp_id, 
        MAX(is_compl_required) as is_compl_required, 
        MAX(status) as status, 
        MAX(act_due_dt) as act_due_dt
    FROM order_compliance_m
    GROUP BY cino, dept_id
) ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id

INNER JOIN case_details cd ON cd.cino = dcs.cino
 WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'D'
  AND ocm.is_compl_required = 'N'
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}

async function getComplianceRequired(dept_id, reg_year) {
    let conn;
    try {
        let query = `
SELECT 
    cd.*,
    ocm.is_compl_required,
    ocm.status AS compliance_status,
    ocm.act_due_dt
FROM dept_cases dcs
INNER JOIN (
    SELECT 
        cino, 
        dept_id, 
        MAX(ord_comp_id) as ord_comp_id, 
        MAX(is_compl_required) as is_compl_required, 
        MAX(status) as status, 
        MAX(act_due_dt) as act_due_dt
    FROM order_compliance_m
    GROUP BY cino, dept_id
) ocm ON dcs.cino = ocm.cino AND ocm.dept_id = dcs.dept_id
INNER JOIN case_details cd ON cd.cino = dcs.cino
WHERE dcs.dept_id = ?
  AND cd.pend_disp = 'D'
  AND ocm.is_compl_required = 'Y'
`
        const params = [dept_id]
        if (reg_year) {
            query += ` AND cd.reg_year = ?`
            params.push(reg_year);
        }
        conn = await pool.getConnection();
        const result = await conn.query(query, params);
        return result;
    } finally {
        if (conn) conn.release();
    }
}
module.exports = {
    getDashboardStatsDetails, getCaseTypeStatsDetails, getFullCaseDetails, getAllCaseDetailsByDeptId,
    getServiceTypeDetails, getCriminalTypeDetails, getCivilTypeDetails, getContemptTypeDetails,
    getComplianceCount, getReplyCount, getOicFormalCount, getOicAppointed, getOicNotAppointed, getOicNotReq
    , getOicFormalParty, getOicForwardToDir, getOicNotForwardToDir, getReplyFiled, getReplyNotFiled,
    getReplyNotRequired, getCompliancePending, getCompliancePendingReview, getComplianceDone, getComplianceRequired,
    getComplianceNotRequired, getComplianceNotAllotted, getComplianceAllotted
}