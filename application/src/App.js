import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import UploadResume from './components/UploadResume';
import GetResumeByID from './components/GetResumeByID';
import GetResumeByName from './components/GetResumeByName';

const styles = theme => ({
  btns: {
    '& > *': {
      margin: theme.spacing(1)
    },
  },
})

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Router>
        <div >
          <div className={classes.btns}>
            <Button variant="contained" color="primary" href="/UploadResume">
              Upload Resume
            </Button>
            <Button variant="contained" color="primary" href="/GetResumeByID">
              Get Resume By Id
            </Button>
            <Button variant="contained" color="primary" href="/GetResumeByName">
              Get Resumes By Name
             </Button>
          </div>
          <Route path="/uploadResume">
            <UploadResume />
          </Route>
          <Route path="/GetResumeByID">
            <GetResumeByID />
          </Route>
          <Route path="/GetResumeByName">
            <GetResumeByName />
          </Route>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App)
