import React, { useState } from 'react';
import _ from 'lodash';

import Helper from '../../../helpers/helper';
import TaskHelper from '../../../helpers/taskHelper';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBox from '@material-ui/core/CheckBox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import NotesIcon from '@material-ui/icons/Notes';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import he from 'date-fns/locale/he';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import RichTextEditor from '../general/RichTextEditor';

import TaskLogStatus from '../../../constants/taskLogStatus';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
        overflowX: 'hidden',
    },
    tableTh: {
        fontWeight: 700,
    },
    thText: {
        dispaly: 'block',
        whiteSpace: 'noWrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    date: {
        fontSize: 12,
    },
    closeButton: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    saveButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 20,
    },
}));


export const TableToolBar = (props) => {

    function handleShiftChange(e) {
        props.onShiftChange(e.target.value);
    }

    function handleDateChange(date) {
        props.onDateChange(date);
    }

    return (
        <Box pb={4}>
            <Toolbar>
                <Box p={1} pt={4} style={{ width: '100%' }}>
                    <Typography variant="h5">לוגים</Typography>
                </Box>
 
                <Box p={1} pt={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
                        <KeyboardDatePicker
                            disableToolbar
                            autoOk
                            variant="inline"
                            format="dd/MM/yyyy"
                            label="תאריך"
                            style={{ width: 150 }}
                            value={props.date ? Helper.getDatePickerFormat(props.date) : null}
                            onChange={handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </Box>

                <Box p={1} pt={4}>
                    <FormControl style={{ width: 150 }} error={false && props.task.shiftIdError}>
                        <InputLabel id="shift">משמרת</InputLabel>
                        <Select
                            labelId="shift"
                            value={props.shiftId}
                            onChange={handleShiftChange}>
                            {props.shifts && props.shifts.map(item => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

            </Toolbar>
        </Box>
    )
};


const TasksLogTable = (props) => {

    const classes = useStyles();

    function handleTaskDetailsClick(taskId) {
        props.onShowTaskDetails(taskId);
    }

    const statusColors = [
        'grey',
        '#2196f3',
        '#4caf50',
        'grey',
        'red',
        'orange',
    ];

    const rows = props.data || [];

    return (
        <div>
            <TableContainer component={Paper} className={classes.table}>
                <Card>
                    <TableToolBar
                        shifts={props.shifts}
                        date={props.date}
                        shiftId={props.shiftId}
                        onDateChange={props.onTaskLogDateChange}
                        onShiftChange={props.onTaskLogShiftChange}
                    />
                </Card>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow color="inherit">
                            <TableCell className={classes.tableTh}>#</TableCell>
                            <TableCell className={classes.tableTh}>שם</TableCell>
                            <TableCell className={classes.tableTh}>פירוט</TableCell>
                            <TableCell className={classes.tableTh}>קישור לנוהל</TableCell>
                            <TableCell className={classes.tableTh}>משמרת</TableCell>
                            <TableCell className={classes.tableTh}>תיזמון</TableCell>
                            <TableCell className={classes.tableTh}>ערכי תיזמון</TableCell>
                            <TableCell className={classes.tableTh}>שעת התחלה</TableCell>
                            <TableCell className={classes.tableTh}>תאריך</TableCell>
                            <TableCell className={classes.tableTh}>זמן</TableCell>
                            <TableCell className={classes.tableTh}>פעולה</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <>
                                <TableRow key={row.id} style={{borderLeft: `7px solid ${statusColors[row.status]}`}}>
                                    <TableCell>{rows.indexOf(row) + 1}</TableCell>
                                    {/*<TableCell>{row.id}</TableCell>*/}
                                    <TableCell className={classes.thText} style={{ maxWidth: '200px' }}>
                                        <Tooltip title={row.name}>
                                            <span>{row.name}</span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="פירוט">
                                            <IconButton size="small" onClick={() => handleTaskDetailsClick(row.id)}>
                                                <NotesIcon fontSize="inherit" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        {row.procedureLink &&
                                            <Tooltip title={row.procedureLink}>
                                                <a href={row.procedureLink} target="_blank">
                                                    <IconButton size="small">
                                                        <OpenInNewIcon fontSize="inherit" />
                                                    </IconButton>
                                                </a>
                                            </Tooltip>
                                        }
                                    </TableCell>
                                    <TableCell>{row.shiftName}</TableCell>
                                    <TableCell>{TaskHelper.getTimingText(row.timingType)}</TableCell>
                                    <TableCell className={classes.thText} style={{ maxWidth: '50px' }}>
                                        <Tooltip title={
                                            row.timingType == 1
                                                ? TaskHelper.getTimingValues(row.timingType, Helper.getDate(row.timingOneTimeDate))
                                                : TaskHelper.getTimingValues(row.timingType, row.timingValues)
                                        }>
                                            <span>
                                                {row.timingType == 1
                                                    ? TaskHelper.getTimingValues(row.timingType, Helper.getDate(row.timingOneTimeDate))
                                                    : TaskHelper.getTimingValues(row.timingType, row.timingValues)
                                                }
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{Helper.chopTimeSeconds(row.startTime)}</TableCell>
                                    <TableCell>{Helper.getDate(row.createDate)}</TableCell>
                                    <TableCell>{Helper.getTime(row.createDate)}</TableCell>
                                    <TableCell>{TaskLogStatus[row.status]}</TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    );
}

export default TasksLogTable;