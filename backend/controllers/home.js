const { GetUser, GetAllUsers, CheckCaseDetail, postDocumentUpload, getDocumentUploadDetails, getCaseAndAGPetitionDetails, getCaseAndAGPetitionDetails1, CheckDeptDetail } = require('../models/home');


async function handleGetUser(req, res) {
    const { email } = req.body;
    try {
        const users = await GetUser(email);
        const user = users[0];
        res.send({ userId: user.id, fullname: user.name, email: user.email, image_path: user.image_path })
    }
    catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleGetAllUsers(req, res) {
    try {
        const users = await GetAllUsers();
        const formattedUsers = JSON.parse(
            JSON.stringify(users, (key, value) =>
                typeof value === 'bigint'
                    ? value.toString()
                    : value
            )
        );
        res.json(formattedUsers);
    }
    catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleCheckCaseDetail(req, res) {
    const { selectedCaseNature, caseNumber, selectedYear, cino } = req.body;
    console.log(selectedCaseNature, caseNumber, selectedYear)
    try {
        const results = await CheckCaseDetail(selectedCaseNature, caseNumber, selectedYear,cino);
        res.send(results);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleCheckDeptDetail(req, res) {
    const { cino, dept_id } = req.body;
    try {
        const results = await CheckDeptDetail(cino, dept_id);
        res.send(results);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handlePostDocumentUpload(req, res) {
    const { doc_id, doc_slno, upload_date, cino, remark } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const file_nm = req.file.filename;
    try {
        const result = await postDocumentUpload(doc_id, doc_slno, file_nm, cino, upload_date, remark);
        res.send(result);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleGetDocumentUploadDetails(req, res) {
    const cino = req.params.cino;
    try {
        const result = await getDocumentUploadDetails(cino);
        res.send(result);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleGetCaseAndAGDetails(req, res) {
    const { reg_year, pet_name, reg_no } = req.body;
    try {
        const result = await getCaseAndAGPetitionDetails(pet_name, reg_no, reg_year);
        res.send(result);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleGetCaseAndAGDetails1(req, res) {
    const { agcino } = req.body;
    try {
        const result = await getCaseAndAGPetitionDetails1(agcino);
        res.send(result);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    handleGetUser, handleGetAllUsers, handleGetDocumentUploadDetails,
    handleCheckCaseDetail, handlePostDocumentUpload, handleGetCaseAndAGDetails
    , handleGetCaseAndAGDetails1, handleCheckDeptDetail
}