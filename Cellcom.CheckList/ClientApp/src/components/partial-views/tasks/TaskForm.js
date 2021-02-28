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
import { KeyboardDatePicker } from '@material-ui/pickers';
import RichTextEditor from '../general/RichTextEditor';
import Day from '@material-ui/pickers/views/Calendar/Day';
import Helper from '../../../helpers/helper';
import taskTimingType from '../../../constants/taskTimingType';


const useStyles = makeStyles({
    taskContainer: {
        maxWidth: 715,
    },
});


const TimingSection = (props) => {

    const daysWeek = [
        { value: 7, label: 'א' },
        { value: 1, label: 'ב' },
        { value: 2, label: 'ג' },
        { value: 3, label: 'ד' },
        { value: 4, label: 'ה' },
        { value: 5, label: 'ו' },
        { value: 6, label: 'ש' },
    ]

    const daysMonth = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
        [26, 27, 28, null, null],
    ]


    function isTimingSelected(value) {
        const timingValues = props.timingValues ? props.timingValues.split(',') : [];
        return timingValues.includes(value.toString());
    }

    function handleWeekDayChange(e) {
        props.onWeekDayChange(e.target.value, e.target.checked);
    }

    function handleMonthDayClick(day) {
        props.onMonthDayChange(day);
    }


    switch (props.type) {
        case 2:
            return (
                <>
                    {daysWeek.map(item => (
                        <FormControlLabel
                            label={item.label}
                            control={
                                <CheckBox onChange={handleWeekDayChange} checked={isTimingSelected(item.value)} value={item.value} />
                            }
                        />
                    ))}
                </>
            )
        case 3:
            return (
                <table>
                    {daysMonth.map(row => (
                        <tr>
                            {row.map(col => (
                                <td>
                                    {col &&
                                        //<FormControlLabel
                                        //    label={col}
                                        //    control={
                                        //        <CheckBox onChange={handleMonthDayChange} checked={isTimingSelected(col)} value={col} />
                                        //    } />
                                        <Day selected={isTimingSelected(col)} onClick={() => handleMonthDayClick(col)}>{col}</Day>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
            )
        default: return null;
    }
}


export default function TaskForm(props) {

    const classes = useStyles();

    // function handleClose() {
    //     props.onClose();
    // }

    function handleNameChange(e) {
        props.onNameChange(e.currentTarget.value);
    }

    function handleProcedureLinkChange(e) {
        props.onProcedureLinkChange(e.currentTarget.value);
    }

    function handleShiftChange(e) {
        props.onShiftChange(e.target.value);
    }

    function handleStartTimeChange(e) {
        props.onStartTimeChange(e.currentTarget.value);
    }

    function handleTimingTypeChange(e) {
        props.onTimingTypeChange(e.target.value);
    }

    function onWeekDayChange(value, isChecked) {
        props.onWeekDayChange(value, isChecked);
    }

    function onMonthDayChange(value, isChecked) {
        props.onMonthDayChange(value, isChecked);
    }

    function handleIsDisabledChange(e) {
        props.onIsDisabledChange(!e.currentTarget.checked);
    }

    function handleOneTimeDateChange(date) {
        props.onOneTimeDateChange(date);
    }

    // function handleSubmitClick() {
    //     props.onSubmitTask();
    // }
    
    
    return (
        <Box className={classes.taskContainer}>
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
                    <Typography>פירוט</Typography>
                    <RichTextEditor
                        value={props.task.details}
                        onChange={props.onDetailsChange}
                    />
                </Box>
                <Box p={1} pt={4}>
                    <TextField fullWidth
                        dir="ltr"
                        label="קישור לנוהל"
                        value={props.task.procedureLink}
                        onChange={handleProcedureLinkChange}
                    />
                </Box>
                <Box p={1} pt={4}>
                    <FormControl style={{ width: 150 }} error={props.task.shiftIdError}>
                        <InputLabel id="shift">משמרת</InputLabel>
                        <Select
                            labelId="shift"
                            value={props.task.shiftId}
                            onChange={handleShiftChange}>
                            {props.shifts && props.shifts.map(item => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{props.task.shiftIdError}</FormHelperText>
                    </FormControl>
                    <Box display="inline" pl={4}>
                        <TextField style={{ width: 150 }}
                            label="שעת התחלה"
                            value={props.task.startTime}
                            onChange={handleStartTimeChange}
                            error={props.task.startTimeError}
                            helperText={props.task.startTimeError}
                        />
                    </Box>
                    <Box display="inline" pl={4}>
                        <FormControl style={{ width: 150 }} error={props.task.timingTypeError || props.task.timingValuesError || props.task.oneTimeDateError}>
                            <InputLabel id="timing">תיזמון</InputLabel>
                            <Select
                                labelId="timing"
                                value={props.task.timingType}
                                onChange={handleTimingTypeChange}>
                                <MenuItem value={0}>יומי</MenuItem>
                                <MenuItem value={1}>מזדמן</MenuItem>
                                <MenuItem value={2}>שבועי</MenuItem>
                                <MenuItem value={3}>חודשי</MenuItem>
                            </Select>
                            <FormHelperText>{props.task.timingTypeError || props.task.timingValuesError || props.task.oneTimeDateError}</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box display="inline" pl={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
                            <KeyboardDatePicker
                                disabled={props.task.timingType != taskTimingType.ONE_TIME}
                                disableToolbar
                                disablePast
                                autoOk
                                variant="inline"
                                format="dd/MM/yyyy"
                                label="תאריך תיזמון"
                                style={{ width: 150 }}
                                value={props.task.timingOneTimeDate ? Helper.getDatePickerFormat(props.task.timingOneTimeDate) : null}
                                onChange={handleOneTimeDateChange}
                                error={props.task.oneTimeDateError} />
                        </MuiPickersUtilsProvider>
                        <FormHelperText>{props.task.oneTimeDateError}</FormHelperText>
                    </Box>
                    <Box p={1}>
                        <TimingSection
                            type={props.task.timingType}
                            timingValues={props.task.timingValues}
                            onWeekDayChange={onWeekDayChange}
                            onMonthDayChange={onMonthDayChange}
                        />
                    </Box>
                </Box>

                <Box p={1}>
                    <FormControlLabel
                        label="מאופשר"
                        control={
                            <CheckBox checked={!props.task.isDisabled} onChange={handleIsDisabledChange} />
                        } />
                </Box>

            </Typography>
        </Box>
    );
}
