const { GetCaseNature, GetYear, GetDocType, GetDeptNamesOnboardings, GetCaseNature2 } = require('../models/master');

async function handleGetCaseNature(req, res) {
    try {
        const results = await GetCaseNature();

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.send(results);
    }
    catch (error) {
        console.error('Error getting result:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleGetCaseNatureIDbyCodeTypeCode(req, res) {
    const case_type_code = req.params.case_type_code;
    try {
        const results = await GetCaseNature2(case_type_code);

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.send(results);
    }
    catch (error) {
        console.error('Error getting result:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleGetYear(req, res) {
    try {
        const results = await GetYear();
        res.send(results);
    }
    catch (error) {
        console.error('Error getting result:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


async function handleGetDocType(req, res) {
    try {
        const result = await GetDocType();
        res.send(result);
    } catch (error) {
        console.error('Error getting result:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function handleGetDeptNamesOnboardings(req, res) {
    try {
        const result = await GetDeptNamesOnboardings();
        res.send(result);
    } catch (error) {
        console.error('Error getting result:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    handleGetCaseNature, handleGetYear, handleGetDocType,
    handleGetDeptNamesOnboardings, handleGetCaseNatureIDbyCodeTypeCode
}