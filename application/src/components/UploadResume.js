import React from 'react'
import { withStyles, TextField, Button, Typography } from '@material-ui/core'
import { uploadResume } from '../services';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    }
})

class UploadResume extends React.Component {

    constructor(props) {
        super(props);
        this.state = { resume: { name: '', jobTitle: '', jobDescription: '', currentCompany: '' }, id: null };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState(prev => ({
            ...prev, resume: {
                ...prev.resume, [nam]: val
            }
        }));
    }

    onSubmit(event) {
        uploadResume(this.state.resume).then(res => this.setState({ id: res })).catch(err => alert('Cant upload Resume'))
        event.preventDefault();
    }


    render() {
        console.log(this.state)
        const { classes } = this.props;
        let idField = this.state.id ? 
        <Typography variant="body2" component="p" color="primary">
            Updated - ID: {this.state.id}
        </Typography> : ""

        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField id="standard-required" label="Name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <TextField id="standard-required" label="Job Title" name="jobTitle" value={this.state.jobTitle} onChange={this.handleChange} />
                    <TextField id="standard-required" label="Job Description" name="jobDescription" value={this.state.jobDescription} onChange={this.handleChange} />
                    <TextField id="standard-required" label="Current Company" name="currentCompany" value={this.state.currentCompany} onChange={this.handleChange} />
                </div>
                <Button variant="contained" color="primary" onClick={this.onSubmit.bind(this)}>
                    Submit
                 </Button>
                {idField}
            </form >
        )
    }
}

export default withStyles(styles)(UploadResume)
