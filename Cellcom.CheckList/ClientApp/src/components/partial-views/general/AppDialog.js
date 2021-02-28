import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        //padding: theme.spacing(2),
    },
}))(MuiDialogContent);




export default function AppDialog(props) {
    return (
        <Dialog open={props.open} fullWidth maxWidth="sm" onClose={props.onClose}>
            <DialogTitle disableTypography onClose={props.onClose}>
                <Typography variant="h6">{props.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <Box dangerouslySetInnerHTML={{ __html: props.content }} p={3} pt={0} />
            </DialogContent>
        </Dialog>
    )
}