const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const services = require('../services');

const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/uploadResumeDetails', services.uploadResumeDetails);

app.get('/api/getResumeById/:id', services.getResumeById);

app.get('/api/getResumeByName/:name', services.getResumeByName);


app.listen(port, function () {
    console.log("Server listening on port " + port);
})
