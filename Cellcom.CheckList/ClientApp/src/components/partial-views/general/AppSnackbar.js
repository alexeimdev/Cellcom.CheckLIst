import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AppSnackbar(props) {

    function handleCloseClick(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        props.onClose();
    };

    return (
        <Snackbar open={props.show} autoHideDuration={6000} onClose={handleCloseClick}>
            <Alert onClose={handleCloseClick} severity={props.alertType}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}