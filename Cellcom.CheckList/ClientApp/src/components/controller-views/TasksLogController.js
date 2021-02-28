import React, { useEffect, useStyles } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TasksLogTable from '../partial-views/tasks/TasksLogTable';
import * as TasksLogActionCreators from '../../actions/tasksLogActionCreators';
import * as AppActionCreators from '../../actions/appActionCreators';
import AppDialog from '../partial-views/general/AppDialog';


const TasksLogController = (props) => {

    function onShowTaskDetails(taskId) {
        props.actions.setTaskDetailsDialog(taskId);
    }

    function onAppDialogClose() {
        props.actions.showAppDialog(null);
    }

    function onTaskLogDateChange(date) {
        props.actions.setTaskLogDate(date);
    }

    function onTaskLogShiftChange(shiftId) {
        props.actions.setTaskLogShiftId(shiftId);
    }


    const tasks = props.tasksLog && props.tasksLog.tasks;
    const shifts = props.app && props.app.appData && props.app.appData.shifts;

    return (
        <>
            <TasksLogTable
                data={tasks}
                shifts={shifts}
                date={props.tasksLog.date}
                shiftId={props.tasksLog.shiftId}
                onShowTaskDetails={onShowTaskDetails}
                onTaskLogDateChange={onTaskLogDateChange}
                onTaskLogShiftChange={onTaskLogShiftChange}
            />

            <AppDialog
                open={props.app.dialog.show}
                title={props.app.dialog.title}
                content={props.app.dialog.content}
                onClose={onAppDialogClose}
            />

        </>
    );
}


const mapStateToProps = (state) => {
    return {
        tasksLog: state.tasksLog,
        app: state.app,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: Object.assign({},
            bindActionCreators(TasksLogActionCreators, dispatch),
            bindActionCreators(AppActionCreators, dispatch),
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksLogController);
