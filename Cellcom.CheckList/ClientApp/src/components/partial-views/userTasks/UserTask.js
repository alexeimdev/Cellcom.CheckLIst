
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import CheckBox from '@material-ui/core/CheckBox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import StopIcon from '@material-ui/icons/Stop';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReplayIcon from '@material-ui/icons/Replay';
import CommentIcon from '@material-ui/icons/Comment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SaveIcon from '@material-ui/icons/Save';

import Helper from '../../../helpers/helper';
import TaskStatus from '../../../constants/taskStatus';

import '../../../styles/_userTask.scss';

const useStyles = makeStyles(theme => ({
    heading1: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    heading2: {
        fontSize: 16,
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        fontSize: 17,
        fontWeight: theme.typography.fontWeightRegular,
    },
    statusBox: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        width: 200,
    },
    statusBoxItem: {
        paddingRight: 10,
        paddingLeft: 10,
    },
    nameBox: {
        width: '100%',
        alignSelf: 'center',
    },
    actionsBox: {
        width: 98,
        marginRight: 45,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        border: '1px solid #e2e2e2',
        borderRadius: 27,
    },
    actionBoxItem: {
        display: 'flex',
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 15,
        paddingTop: 15,
        width: '50%',
    },
    boxIcon: {
        paddingRight: 10,
    },
    boxContent: {
        flex: 1,
    },
    details: {
        borderLeft: '2px solid grey',
        paddingLeft: 10,
    },
}));

export default function UserTask(props) {

    const classes = useStyles();

    const statuses = {
        pending: {
            enum: TaskStatus.PENDING,
            color: 'grey',
            label: 'ממתין',
            icon: (<AccessTimeIcon fontSize="small" />),
        },
        running: {
            enum: TaskStatus.RUNNING,
            color: 'orange',
            label: 'בריצה',
            icon: (<PlayArrowIcon />),
        },
        done: {
            enum: TaskStatus.DONE,
            color: '#4caf50',
            label: 'בוצע',
            icon: <CheckIcon />,
        },
        undone: {
            enum: TaskStatus.UNDONE,
            color: 'grey',
            label: 'ממתין',
            icon: (<AccessTimeIcon fontSize="small" />),
        },
        canceled: {
            enum: TaskStatus.CANCELED,
            color: 'red',
            label: 'בוטל',
            icon: <ClearIcon />,
        },
        onHold: {
            enum: TaskStatus.ON_HOLD,
            color: '#2196f3',
            label: 'מושהה',
            icon: <PauseIcon />,
        },
    }

    const taskStatusObj = Object.entries(statuses)[props.item.status];
    if (taskStatusObj == undefined) {
        return null;
    }

    const taskStatus = taskStatusObj[1];



    function handleCheckedChange(e, taskId) {
        const isChecked = e.target.checked;
        const status = isChecked ? TaskStatus.DONE : TaskStatus.UNDONE;
        props.onTaskStatusChange(taskId, status);
    }

    function handlePlayClick(taskId) {
        props.onTaskStatusChange(taskId, TaskStatus.RUNNING);
    }

    function handlePauseClick(taskId) {
        props.onTaskStatusChange(taskId, TaskStatus.ON_HOLD);
    }

    function handleCancelClick(taskId) {
        props.onTaskStatusChange(taskId, TaskStatus.CANCELED);
    }

    function handleUncancelClick(taskId) {
        props.onTaskStatusChange(taskId, TaskStatus.PENDING);
    }

    function handleCommentsChange(taskId, e) {
        props.onCommentsChange(taskId, e.target.value);
    }

    function handleSaveComments(taskId) {
        props.onSaveComments(taskId);
    }


    return (
        <ExpansionPanel
            className={taskStatus.enum == TaskStatus.RUNNING && "blink-pause"}
            style={{ borderLeft: `10px solid ${taskStatus.color}` }}>
            <ExpansionPanelSummary
                expandIcon={
                    <Tooltip title="פרטים">
                        <ExpandMoreIcon />
                    </ Tooltip>
                }>

                <Box>
                    <Tooltip title="בוצע">
                        <FormControlLabel
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                            control={
                                <CheckBox
                                    color="primary"
                                    checked={taskStatus.enum == TaskStatus.DONE}
                                    onChange={(e) => handleCheckedChange(e, props.item.id)} />
                            }
                        />
                    </Tooltip>
                </Box>

                <Box className={classes.nameBox}>
                    <Typography className={classes.heading1}>{props.item.name}</Typography>
                </Box>

                <Box display="flex">

                    <Box className={classes.actionsBox}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}>
                        {taskStatus.enum != TaskStatus.DONE &&
                            <Box className={classes.actions}>
                                <Box className={classes.actionBoxItem}>
                                    {taskStatus.enum == TaskStatus.RUNNING
                                        ?
                                    <Tooltip title="השהה">
                                        <IconButton color="inherit" onClick={() => { handlePauseClick(props.item.id) }}>
                                                <PauseIcon />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip color="inherit" title="הרץ">
                                            <IconButton onClick={() => { handlePlayClick(props.item.id) }}>
                                                <PlayArrowIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </Box>
                                <Box className={classes.actionBoxItem}>
                                    {taskStatus.enum != TaskStatus.CANCELED
                                        ?
                                    <Tooltip title="בטל">
                                        <IconButton color="inherit" onClick={() => { handleCancelClick(props.item.id) }}>
                                                <ClearIcon />
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title="הפעל">
                                            <IconButton color="inherit" onClick={() => { handleUncancelClick(props.item.id) }}>
                                                <ReplayIcon />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </Box>
                            </Box>
                        }
                    </Box>

                    <Divider orientation="vertical" flexItem />

                    <Box className={classes.statusBox}
                        onClick={event => event.stopPropagation()}
                        onFocus={event => event.stopPropagation()}>
                        <Box className={classes.statusBoxItem}>
                            <Tooltip title={taskStatus.label}>
                                {taskStatus.icon}
                            </Tooltip>
                        </Box>
                        <Box className={classes.statusBoxItem}>
                            <Typography className={classes.heading2}>
                                {Helper.chopTimeSeconds(props.item.startTime)}
                                <LinearProgress variant="determinate" value={props.item.progress} pl={1} style={{ width: 100 }} />
                            </Typography>
                        </Box>
                    </Box>

                </Box>

            </ExpansionPanelSummary>

            <Divider />

            <ExpansionPanelDetails>
                {props.item.details &&
                    <Box className={classes.box}>
                        <Box className={classes.boxIcon}>
                            <AssignmentIcon />
                        </Box>
                        <Box className={classes.boxContent}>
                            <Typography className={classes.title}>הוראות</Typography>
                            <Box className={classes.details} dangerouslySetInnerHTML={{ __html: props.item.details }} />
                        </Box>
                    </Box>
                }
                {props.item.procedureLink &&
                    <Box className={classes.box}>
                        <Box className={classes.boxIcon}>
                            <OpenInNewIcon />
                        </Box>
                        <Box className={classes.boxContent}>
                            <Typography className={classes.title}>קישור לנוהל</Typography>
                            <Link href={props.item.procedureLink} target="_blank">{props.item.procedureLink}</Link>
                        </Box>
                    </Box>
                }
            </ExpansionPanelDetails>

            <Divider />

            <ExpansionPanelActions>
                <Box className={classes.box}>
                    <Box className={classes.boxIcon}>
                        <CommentIcon />
                    </Box>
                    <Box className={classes.boxContent}>
                        <Typography className={classes.title}>הערות</Typography>
                        <TextField multiline
                            style={{ width: '90%' }}
                            value={props.item.comments}
                            onChange={e => handleCommentsChange(props.item.id, e)}
                        />
                        <Tooltip title="שמור">
                            <IconButton color="primary"
                                disabled={!props.item.isCommentsDirty}
                                onClick={() => handleSaveComments(props.item.id)}>
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </ExpansionPanelActions>
        </ExpansionPanel>
    );
}

