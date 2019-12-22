const db = require('../database')

module.exports = function getResumeByName(req, res) {
    const name = req.params.name.replace('+', ' ');
    console.log('getResumeByName:', name);
    db.getResumeByNameRegex(`^${name}$`).then(resumes => {
        if (resumes.length !== 0) {
            res.send(resumes);
        } else {
            var promises = name.split(" ").map(ele => {
                return db.getResumeByNameRegex(ele).then(resumes => {
                    var result = { matchedString: ele, data: resumes }
                    return result;
                }).catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
            })
            Promise.all(promises).then(result => res.send(result))
        }

    }).catch(err => res.status(400).send(err))
}