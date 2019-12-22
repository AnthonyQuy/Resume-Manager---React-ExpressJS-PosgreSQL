import React from 'react'
import { withStyles, TextField, Button } from '@material-ui/core'
import { getResumeByName} from '../services'
import ResumeCard from './ResumeCard';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500,
        },
    }
})

class GetResumeByName extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '' , resumes : []};
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
    }

    onSubmit(event) {
        getResumeByName(this.state.name).then(resumes => this.setState({resumes : resumes})).catch(err => this.setState({resume: null}))
        event.preventDefault();
    }

    render() {
        console.log(this.state)
        const { classes } = this.props;
       
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField className={classes.textField} id="standard-required" label="Name" name="name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <Button variant="contained" color="primary" onClick={this.onSubmit.bind(this)}>
                    GET
                 </Button>
                 {this.state.resumes.map(resume => {
                     return <ResumeCard resumeData = {resume} />
                 })}
            </form >
        )
    }
}

export default withStyles(styles)(GetResumeByName)
