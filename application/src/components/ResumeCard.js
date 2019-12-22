import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
    card: {
        minWidth: 275,
        margin:10
    },
    pos: {
        marginBottom: 12,
    }
})


class ResumeCard extends React.Component {
    render() {
        console.log(this.props)
        const { classes, resumeData } = this.props;
        return (
            <Card className={classes.card} >
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {resumeData.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {resumeData.jobTitle}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {resumeData.currentCompany}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {resumeData.jobDescription}
                    </Typography>
                </CardContent>
            </Card >
        );
    }
}

export default withStyles(styles)(ResumeCard)
