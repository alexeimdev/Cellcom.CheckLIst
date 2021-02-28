import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import ClearIcon from '@material-ui/icons/Clear';

import UserTask from '../userTasks/UserTask';
import AppConfirm from '../general/AppConfirm';

const useStyles = makeStyles(theme => ({
    btnClear: {
        marginRight: 20,
    },
}));

export const UserTasksToolBar = (props) => {

    const classes = useStyles();

    function handleRefreshClick() {
        props.onRefreshClick();
    }

    function handleResetClick() {
        props.onResetClick();
    }


    return (
        <Box pb={4}>
            <Toolbar>
                <Typography variant="h5">סעיפים לביצוע</Typography>

                <Box style={{ flexGrow: 1 }} />

                <Button variant="contained" color="secondary" className={classes.btnClear} onClick={handleResetClick}>
                    <ClearIcon />
                    אפס סעיפים
                </Button>

                <Button variant="outlined" color="primary" onClick={handleRefreshClick}>
                    <RefreshIcon />
                    ריענון
                </Button>

            </Toolbar>
        </Box>
    )
};


export default function UserTasks(props) {

    return (
        <div>
            <Card>
                <UserTasksToolBar
                    onRefreshClick={props.onRefreshClick}
                    onResetClick={props.onResetClick} />
            </Card>

            {props.tasks && props.tasks.map(item =>
                <UserTask
                    key={item.id}
                    item={item}
                    onTaskStatusChange={props.onTaskStatusChange}
                    onCommentsChange={props.onCommentsChange}
                    onSaveComments={props.onSaveComments} />
            )}

            <AppConfirm open={props.openResetConfirm}
                title="איפוס סעיפים"
                message="האם ברצונך לאפס את הסטטוס והערות של כל הסעיפים?"
                onAccept={props.onResetAccept}
                onDecline={props.onResetDecline}
            />

        </div>
    )
}