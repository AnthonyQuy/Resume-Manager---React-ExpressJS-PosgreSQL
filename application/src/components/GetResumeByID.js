import React from 'react'
import { withStyles, TextField, Button } from '@material-ui/core'
import {getResumeById} from '../services'
import ResumeCard from './ResumeCard';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500,
        },
    }
})

class GetResumeByID extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: '' , resume : null};
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    onSubmit(event) {
        getResumeById(this.state.id).then(resume => this.setState({resume:resume})).catch(err => this.setState({resume: null}))
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        let resumeCard = this.state.resume != null ? <ResumeCard resumeData = {this.state.resume}/> : '';
        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField className={classes.textField} id="standard-required" label="ID" name="id" value={this.state.name} onChange={this.handleChange} />
                </div>
                <Button variant="contained" color="primary" onClick={this.onSubmit.bind(this)}>
                    GET
                 </Button>
                 {resumeCard}
            </form >
        )
    }
}

export default withStyles(styles)(GetResumeByID)
