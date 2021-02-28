import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { RadioGroup, Radio } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ShiftHelper from '../../../helpers/shiftHelper';


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


export default function ShiftSelector(props) {

    const [ currentShiftId, setCurrentShiftId ] = useState(-1)

    useEffect(() => {
        const currentTimeShiftId = ShiftHelper.checkCurrentTimeShift(props.shifts);
        if (currentTimeShiftId > -1) {
            setCurrentShiftId(currentTimeShiftId);
        }
    }, [props])


    function handleSelectChange(e) {
        const shiftId = e.target.value >= 0 ? parseInt(e.target.value) : null;
        setCurrentShiftId(shiftId);
    }

    function handleAcceptClick() {
        props.onAcceptShift(currentShiftId);
    }



    return (
        <Dialog open={props.open} fullWidth maxWidth="xs" scroll="paper" onClose={props.onClose}>
            <DialogTitle disableTypography onClose={props.onClose}>
                <Typography variant="h6">בחירת משמרת</Typography>
            </DialogTitle>
            <DialogContent>
                <FormControl component="fieldset">
                    <RadioGroup value={currentShiftId} onChange={handleSelectChange}>
                    {props.shifts && props.shifts.map(shift =>
                        <FormControlLabel
                            key={shift.id}
                            label={shift.name}
                            value={shift.id}
                            control={<Radio />}
                        />
                    )}
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAcceptClick} color="primary">אישור</Button>
            </DialogActions>
        </Dialog>
    )
}