const db = require('../database')

module.exports = function uploadResumeDetails(req, res) {
    console.log('uploadResumeDetails');
    let resume = req.body;
    if (isValidResume(resume))
        db.insertResume(resume).then(id => res.send(id)).catch(err => { res.status(400).send(err.errmsg) })
    else res.status(400).send("Invalid Resume")
}
function isValidResume(resume) {
    return resume && resume.name && resume.jobTitle && resume.jobDescription && resume.currentCompany
}