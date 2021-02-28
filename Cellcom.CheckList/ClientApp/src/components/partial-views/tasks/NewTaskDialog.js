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
import TaskForm from './TaskForm';

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

export default function NewTaskDialog(props) {

    function handleClose() {
        props.onClose();
    }

    function handleSubmitClick() {
        props.onSubmitTask();
    }


    return (
        <Dialog onClose={handleClose} open={props.open} fullWidth maxWidth="md" scroll="body">
            <DialogTitle disableTypography onClose={handleClose}>
                <Typography variant="h6">{props.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <TaskForm
                    task={props.task}
                    shifts={props.shifts}
                    onNameChange={props.onNameChange}
                    onDetailsChange={props.onDetailsChange}
                    onProcedureLinkChange={props.onProcedureLinkChange}
                    onShiftChange={props.onShiftChange}
                    onStartTimeChange={props.onStartTimeChange}
                    onTimingTypeChange={props.onTimingTypeChange}
                    onWeekDayChange={props.onWeekDayChange}
                    onMonthDayChange={props.onMonthDayChange}
                    onOneTimeDateChange={props.onOneTimeDateChange}
                    onIsDisabledChange={props.onIsDisabledChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmitClick} color="primary">שמור</Button>
            </DialogActions>
        </Dialog>
    );
}
