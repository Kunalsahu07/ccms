const { getDashboardStatsDetails, getCaseTypeStatsDetails, getFullCaseDetails,
    getServiceTypeDetails, getCriminalTypeDetails, getCivilTypeDetails,
    getContemptTypeDetails, getAllCaseDetailsByDeptId,
    getComplianceCount,
    getReplyCount,
    getOicFormalCount,
    getOicAppointed,
    getOicNotAppointed,
    getOicNotReq,
    getOicFormalParty,
    getOicForwardToDir,
    getOicNotForwardToDir,
    getReplyFiled,
    getReplyNotFiled,
    getReplyNotRequired,
    getCompliancePending,
    getCompliancePendingReview,
    getComplianceDone,
    getComplianceAllotted,
    getComplianceNotAllotted,
    getComplianceNotRequired,
    getComplianceRequired } = require("../models/dashboardModel");

async function handleGetDashboardDetails(req, res) {
    const dept_id = req.params.dept_id;
    const reg_year = req.params.reg_year;
    try {
        const result = await getDashboardStatsDetails(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetCaseTypeDetails(req, res) {
    const dept_id = req.params.dept_id;
    const reg_year = req.params.reg_year;
    try {
        const result = await getCaseTypeStatsDetails(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetFullCaseDetails(req, res) {
    const { dept_id, pend_disp, reg_year } = req.params;
    try {
        const result = await getFullCaseDetails(dept_id, pend_disp, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetServiceTypeDetails(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getServiceTypeDetails(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetCriminalTypeDetails(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getCriminalTypeDetails(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetCivilTypeDetails(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getCivilTypeDetails(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetContemptTypeDetails(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getContemptTypeDetails(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetAllCaseDetailsByDeptId(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getAllCaseDetailsByDeptId(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetComplianceCount(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getComplianceCount(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetReplyCount(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getReplyCount(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetOicFormalCount(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getOicFormalCount(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetOicAppointed(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getOicAppointed(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetOicNotAppointed(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getOicNotAppointed(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}
async function handleGetOicNotReq(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getOicNotReq(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetOicFormalParty(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getOicFormalParty(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetOicForwardToDir(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getOicForwardToDir(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetOicNotForwardToDir(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getOicNotForwardToDir(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetReplyFiled(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getReplyFiled(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetReplyNotFiled(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getReplyNotFiled(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetReplyNotRequired(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getReplyNotRequired(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }

}

async function handleGetCompliancePending(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getCompliancePending(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetCompliancePendingReview(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getCompliancePendingReview(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetComplianceDone(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getComplianceDone(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetComplianceAllotted(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getComplianceAllotted(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}
async function handleGetComplianceNotAllotted(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getComplianceNotAllotted(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}
async function handleGetComplianceNotRequired(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getComplianceNotRequired(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

async function handleGetComplianceRequired(req, res) {
    const { dept_id, reg_year } = req.params;
    try {
        const result = await getComplianceRequired(dept_id, reg_year);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    handleGetDashboardDetails, handleGetCaseTypeDetails, handleGetFullCaseDetails,
    handleGetCivilTypeDetails, handleGetCriminalTypeDetails, handleGetServiceTypeDetails
    , handleGetContemptTypeDetails, handleGetAllCaseDetailsByDeptId, handleGetComplianceCount,
    handleGetReplyCount, handleGetOicFormalCount, handleGetOicAppointed, handleGetOicNotAppointed,
    handleGetOicNotReq, handleGetOicFormalParty, handleGetOicForwardToDir, handleGetOicNotForwardToDir
    , handleGetReplyFiled, handleGetReplyNotFiled, handleGetReplyNotRequired, handleGetCompliancePending
    , handleGetCompliancePendingReview, handleGetComplianceDone, handleGetComplianceAllotted, handleGetComplianceNotAllotted,
    handleGetComplianceRequired, handleGetComplianceNotRequired
};