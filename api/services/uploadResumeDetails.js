const db = require('../database')

module.exports = function uploadResumeDetails(req, res) {
    console.log('uploadResumeDetails');
    var resume = req.body;
    db.insertResume(resume).then(id => res.send(id)).catch(err => { res.status(400).send(err.errmsg) })
}

