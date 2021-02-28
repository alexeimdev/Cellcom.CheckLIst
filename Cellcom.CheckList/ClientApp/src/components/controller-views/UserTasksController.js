import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import useInterval from 'use-interval';

import * as UserTasksActionCreators from '../../actions/userTasksActionCreators';

import UserTasks from '../partial-views/userTasks/UserTasks';
import ShiftSelector from '../partial-views/userTasks/ShiftSelector';
import TaskHelper from './../../helpers/taskHelper';


const UserTasksController = (props) => {

    /* TODO: for skiping shifts- delete later */
    //useEffect(() => {
        //onAcceptShift(1);
    //}, [])


    useInterval(() => {
        if (props.userTasks.tasks && props.userTasks.tasks.length > 0) {
            props.userTasks.tasks.forEach(item => {
                checkTaskProgress(item);
            });
        }
    }, 1000)


    const shifts = props.app.appData && props.app.appData.shifts || [];


    function onAcceptShift(shiftId) {
        props.actions.setActiveShiftId(shiftId);
        props.actions.openShiftSelectorDialog(false);
    }

    function onTaskStatusChange(taskId, status) {
        props.actions.submitTaskStatus(taskId, status);
    }

    function checkTaskProgress(item) {
        const progress = TaskHelper.getProgressValue(item.startTime, item.shift.fromTime, item.shift.toTime)

        if (item.progress != progress) {
            props.actions.setTaskProgress(item.id, progress);
        }

        if (item.progress > 0) {
            props.actions.setTaskIsRunning(item.id);
        }
    }

    function onCommentsChange(taskId, value) {
        props.actions.setTaskComments(taskId, value);
        props.actions.setTaskCommentsIsDirty(taskId, true);
    }

    function onSaveComments(taskId) {
        props.actions.submitTaskComments(taskId);
    }

    function onUserTasksRefreshClick() {
        props.actions.fetchUserTasks(true);
    }

    function onUserTasksResetClick() {
        props.actions.openUserTaskResetConfirm(true);
    }

    function onUserTasksResetConfirmAccept() {
        props.actions.submitUserTaskReset();
        props.actions.openUserTaskResetConfirm(false);
    }

    function onUserTasksResetConfirmDecline() {
        props.actions.openUserTaskResetConfirm(false);
    }


    return (
        <>
            <UserTasks
                tasks={props.userTasks.tasks}
                openResetConfirm={props.userTasks.openUserTasksResetConfirm}
                onTaskStatusChange={onTaskStatusChange}
                onCommentsChange={onCommentsChange}
                onSaveComments={onSaveComments}
                onRefreshClick={onUserTasksRefreshClick}
                onResetClick={onUserTasksResetClick}
                onResetAccept={onUserTasksResetConfirmAccept}
                onResetDecline={onUserTasksResetConfirmDecline} />

            <ShiftSelector
                open={props.userTasks.isShiftSelectorDialogOpen}
                shifts={shifts}
                activeShift={props.userTasks.activeShiftId}
                onAcceptShift={onAcceptShift} />
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        userTasks: state.userTasks,
        app: state.app,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: Object.assign({},
            bindActionCreators(UserTasksActionCreators, dispatch),
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTasksController);
