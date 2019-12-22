const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const services = require('../services');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/uploadResumeDetails', services.uploadResumeDetails);

app.get('/api/getResumeById/:id', services.getResumeById);

app.get('/api/getResumeByName/:name', services.getResumeByName);


app.listen(port, function () {
    console.log("Server listening on port " + port);
})
