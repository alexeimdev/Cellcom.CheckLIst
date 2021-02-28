import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const AppConfirm = (props) => {

    function handleAcceptClick() {
        props.onAccept();
    }

    function handleDeclineClick() {
        props.onDecline();
    }

    return (
        <Dialog fullWidth maxWidth="xs" open={props.open}>
            <DialogTitle>
                {props.title}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>{props.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeclineClick} color="primary">ביטול</Button>
                <Button onClick={handleAcceptClick} color="primary">אישור</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AppConfirm;