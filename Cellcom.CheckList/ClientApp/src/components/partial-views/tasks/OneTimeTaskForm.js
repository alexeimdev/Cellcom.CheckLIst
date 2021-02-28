import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CheckBox from '@material-ui/core/CheckBox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import DateFnsUtils from '@date-io/date-fns';
import he from 'date-fns/locale/he';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import RichTextEditor from '../general/RichTextEditor';
import Day from '@material-ui/pickers/views/Calendar/Day';
import Helper from '../../../helpers/helper';
import taskTimingType from '../../../constants/taskTimingType';


const useStyles = makeStyles({
    container: {
        maxWidth: 715,
    },
});

export default function OneTimeTaskForm(props) {

    const classes = useStyles();

    // function handleClose() {
    //     props.onClose();
    // }

    function handleNameChange(e) {
        props.onNameChange(e.currentTarget.value);
    }

    // function handleShiftChange(e) {
    //     props.onShiftChange(e.target.value);
    // }

    // function handleStartTimeChange(e) {
    //     props.onStartTimeChange(e.currentTarget.value);
    // }

    // function handleOneTimeDateChange(date) {
    //     props.onOneTimeDateChange(date);
    // }

    // function handleSubmitClick() {
    //     props.onSubmitTask();
    // }

    function handleDateTimePickerChange(value) {
        props.onDateTimeChange(value);
    }

    function handleDetailsChange(value){
        props.onDetailsChange(value);
    }

    function handleCommentsChange(e) {
        props.onCommentsChange(e.currentTarget.value);
    }
    

    return (
        <Box className={classes.container}>
            <Typography gutterBottom>
                <Box p={1}>
                    <TextField fullWidth
                        label="שם"
                        value={props.task.name}
                        onChange={handleNameChange}
                        error={props.task.nameError}
                        helperText={props.task.nameError} />
                </Box>
                <Box p={1} pt={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
                            <KeyboardDateTimePicker
                                disablePast
                                autoOk
                                variant="inline"
                                format="HH:mm dd/MM/yyyy"
                                ampm={false}
                                label="תאריך תיזמון"
                                value={props.task.dateTime}
                                onChange={handleDateTimePickerChange}
                                error={props.task.oneTimeDateError} />
                        </MuiPickersUtilsProvider>
                        <FormHelperText>{props.task.oneTimeDateError}</FormHelperText>
                    </Box>
                <Box p={1} pt={4}>
                    <Typography>פירוט</Typography>
                    <RichTextEditor
                        value={props.task.details}
                        onChange={handleDetailsChange}
                    />
                </Box>
                <Box p={1} pt={4}>
                    <TextField fullWidth multiline
                        label="הערות"
                        value={props.task.comments}
                        onChange={handleCommentsChange}
                    />
                </Box>
            </Typography>
        </Box>
    );
}
