const db = require('../database')

module.exports = function getResumeByName(req, res) {
    const name = req.params.name.replace('+', ' ');
    console.log('getResumeByName:', name);
    db.getResumeByNameRegex(`^${name}$`).then(resumes => {
        if (resumes.length !== 0) {
            res.send(resumes);
        } else {
            let promises = name.split(" ").map(ele => {
                return db.getResumeByNameRegex(ele).then(resumes => {
                    resumes.map(ele => delete ele._id)
                    return resumes;
                }).catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
            })
            Promise.all(promises).then(arr => {
                let result = arr.reduce((pre, cur) => {
                    pre.push(...cur)
                    return pre;
                }, [])
                res.send(result);
            })
        }
    }).catch(err => res.status(400).send(err))
}