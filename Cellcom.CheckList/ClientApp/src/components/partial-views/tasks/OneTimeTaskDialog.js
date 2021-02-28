import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import OneTimeTaskForm from './OneTimeTaskForm';

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


export default function OneTimeTaskDialog(props) {

    function handleClose() {
        props.onClose();
    }

    function handleSubmitClick() {
        props.onSubmit();
    }


    return (
        <Dialog onClose={handleClose} open={props.open} fullWidth maxWidth="md" scroll="body">
            <DialogTitle disableTypography onClose={handleClose}>
                <Typography variant="h6">{props.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <OneTimeTaskForm
                    task={props.task}
                    onNameChange={props.onNameChange}
                    onDateTimeChange={props.onDateTimeChange}
                    onDetailsChange={props.onDetailsChange}
                    onCommentsChange={props.onCommentsChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmitClick} color="primary">שמור</Button>
            </DialogActions>
        </Dialog>
    );
}
