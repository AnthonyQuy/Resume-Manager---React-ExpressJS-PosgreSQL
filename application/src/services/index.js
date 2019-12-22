import axios from 'axios';
import config from './endpoints.conf'


export async function uploadResume(resume) {
    let res = await axios.post(`${config.server}${config.uploadResume}`,resume);
    return res.data;
}


export async function getResumeById(id) {
    let res = await axios.get(`${config.server}${config.getResumeById}${id}`);
    return res.data;
}


export async function getResumeByName(name) {
    let res = await axios.get(`${config.server}${config.getResumeByName}${name}`);
    return res.data;
}

