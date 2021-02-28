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
import EditIcon from '@material-ui/icons/Edit';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
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
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

import TaskForm from '../../partial-views/tasks/TaskForm';


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
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

    const anchorRef = React.useRef(null);
    const [openMenu, setOpenMenu] = useState(false);

    function handleDisbledChange() {
        props.onDisabledChange(!props.isDisabled);
    }

    function handleDeletedChange() {
        props.onDeletedChange(!props.isDeleted);
    }

    function handleOneTimeTasksChange() {
        props.onOneTimeTasksChange(!props.isOneTimeTasks);
    }

    function handleNewTaskClick() {
        props.onOpenNewTask();
    }

    function handleFilterButtonClick() {
        setOpenMenu(true);
    }

    function handleMenuClose() {
        setOpenMenu(false);
    }


    return (
        <Box pb={4}>
            <Toolbar>
                <Typography variant="h5" >סעיפים</Typography>

                <Tooltip title="סינון">
                    <IconButton>
                        <FilterListIcon ref={anchorRef} onClick={handleFilterButtonClick} color={(props.isDisabled || props.isDeleted || props.isOneTimeTasks) ? "secondary" : ""} />
                    </IconButton>
                </Tooltip>

                <Box style={{ flexGrow: 1 }} />

                <Button variant="contained" color="primary" onClick={handleNewTaskClick}>
                    <AddIcon />
                    הוספה
                </Button>

                <Menu
                    id="long-menu"
                    anchorEl={anchorRef.current}
                    keepMounted
                    open={openMenu}
                    onClose={handleMenuClose}>
                    <MenuItem>
                        <FormControlLabel
                            label="לא מאופשר"
                            control={
                                <CheckBox onChange={handleDisbledChange} checked={props.isDisabled} />
                            } />
                    </MenuItem>
                    <MenuItem>
                        <FormControlLabel
                            label="מחוק"
                            control={
                                <CheckBox onChange={handleDeletedChange} checked={props.isDeleted} />
                            } />
                    </MenuItem>
                    <MenuItem>
                        <FormControlLabel
                            label="מזדמן"
                            control={
                                <CheckBox onChange={handleOneTimeTasksChange} checked={props.isOneTimeTasks} />
                            } />
                    </MenuItem>
                </Menu>
            </Toolbar>
        </Box>
    )
};


const TasksTable = (props) => {

    function handleEditClick(taskId) {
        props.onEdit(taskId);
    }

    function handleDeleteClick(taskId) {
        props.onDelete(taskId);
    }

    function handleRestoreClick(taskId) {
        props.onRestore(taskId);
    }

    function handleTaskDetailsClick(taskId) {
        props.onShowTaskDetails(taskId);
    }

    const rows = props.data || [];
    /*
    const rowsByShiftObj = _.groupBy(rows, x => x.shift.name);
    const rowsByShiftArr = Object.entries(rowsByShiftObj) || [];
    */
    const classes = useStyles();

    return (
        <div>
            <TableContainer component={Paper}>
                <Card>
                    <TableToolBar
                        isDisabled={props.isDisabled}
                        isDeleted={props.isDeleted}
                        isOneTimeTasks={props.isOneTimeTasks}
                        onDisabledChange={props.onDisabledChange}
                        onDeletedChange={props.onDeletedChange}
                        onOneTimeTasksChange={props.onOneTimeTasksChange}
                        onOpenNewTask={props.onOpenNewTask}
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
                            <TableCell className={classes.tableTh}>תאריך יצירה</TableCell>
                            <TableCell className={classes.tableTh}>תאריך עדכון</TableCell>
                            <TableCell className={classes.tableTh}>פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <>
                                <TableRow key={row.id}>
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
                                    <TableCell>{row.shift.name}</TableCell>
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
                                    <TableCell>{Helper.getDate(row.updateDate)}</TableCell>
                                    <TableCell>
                                        <Tooltip title="ערוך">
                                            <IconButton size="small" onClick={() => handleEditClick(row.id)}>
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                        </Tooltip>

                                        {row.isDeleted ?
                                            <Tooltip title="שחזר">
                                                <IconButton size="small"  onClick={() => handleRestoreClick(row.id)}>
                                                    <RestoreIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                            :
                                            <Tooltip title="מחק">
                                                <IconButton size="small" onClick={() => handleDeleteClick(row.id)}>
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </TableCell>
                                </TableRow>
                                {(props.openEditTask && props.editTaskId == row.id) &&
                                    <TableRow>
                                        <TableCell colSpan={11}>
                                            <Box className={classes.closeButton}>
                                                <IconButton onClick={props.onEditTaskClose}>
                                                    <CloseIcon />
                                                </IconButton>
                                            </Box>
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
                                            <Box className={classes.saveButton}>
                                                <Button variant="contained" color="primary" onClick={props.onSubmitTask}>
                                                    <SaveIcon />
                                                    שמור
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                }
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div>
    );
}

export default TasksTable;