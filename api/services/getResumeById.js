const db = require('../database')

module.exports = function getResumeById(req, res) {
    const id = req.params.id;
    console.log('getResumeById:', id);
    db.getResumeById(id).then(resume => {
        delete resume._id
        res.send(resume)
    }).catch(err => { res.status(404).send() })
}