import React, { useEffect, useStyles } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TasksTable from '../partial-views/tasks/TasksTable';
import AppConfirm from '../partial-views/general/AppConfirm';
import NewTaskDialog from '../partial-views/tasks/NewTaskDialog';

import * as TasksActionCreators from '../../actions/tasksActionCreators';
import * as AppActionCreators from '../../actions/appActionCreators';
import AppDialog from '../partial-views/general/AppDialog';



const TaskController = (props) => {

    useEffect(() => {
        props.actions.fetchTasks();
    }, []);


    function onDisabledChange(value) {
        props.actions.setIsDisabledTasks(value);
    }

    function onDeletedChange(value) {
        props.actions.setIsDeletedTasks(value);
    }

    function onOneTimeTasksChange(value) {
        props.actions.setIsOneTimeTasks(value);
    }


    // Delete task
    function onDelete(taskId) {
        props.actions.openDeleteTaskDialog(true);
        props.actions.setDeleteTaskId(taskId);
    }

    function onDeleteTaskAccept() {
        props.actions.openDeleteTaskDialog(false);
        props.actions.deleteTask();
    }

    function onDeleteTaskDecline() {
        props.actions.openDeleteTaskDialog(false);
        props.actions.setDeleteTaskId(null);
    }


    // Restore task
    function onRestore(taskId) {
        props.actions.openRestoreTaskDialog(true);
        props.actions.setRestoreTaskId(taskId);
    }

    function onRestoreTaskAccept() {
        props.actions.openRestoreTaskDialog(false);
        props.actions.restoreTask();
    }

    function onRestoreTaskDecline() {
        props.actions.openRestoreTaskDialog(false);
        props.actions.setRestoreTaskId(null);
    }


    // Task
    function onNameChange(value) {
        props.actions.setTaskName(value);
    }

    function onDetailsChange(value) {
        props.actions.setTaskDetails(value);
    }

    function onProcedureLinkChange(value) {
        props.actions.setTaskProcedureLink(value);
    }

    function onStartTimeChange(value) {
        props.actions.setTaskStartTime(value);
    }

    function onShiftChange(value) {
        props.actions.setTaskShiftId(value);
    }

    function onTimingTypeChange(value) {
        props.actions.setTaskTimingType(value);
    }

    function onWeekDayChange(day, isChecked) {
        props.actions.setTaskWeekDay(day, isChecked);
    }

    function onMonthDayChange(day) {
        props.actions.setTaskMonthDay(day);
    }

    function onOneTimeDateChange(date) {
        props.actions.setTaskOneTimeDate(date);
    }

    function onIsDisabledChange(isChecked) {
        props.actions.setTaskIsDisabled(isChecked);
    }

    function onOpenNewTask() {
        props.actions.openNewTaskDialog(true);
    }

    function onCloseNewTask() {
        props.actions.clearTask();
        props.actions.openNewTaskDialog(false);
    }

    function onOpenUpdateTask(taskId) {
        props.actions.setUpdateTaskId(taskId);
        props.actions.fetchTask();
        props.actions.openUpdateTaskDialog(true);
    }

    function onCloseUpdateTask() {
        props.actions.clearTask();
        props.actions.openUpdateTaskDialog(false);
    }

    function onSubmitNewTask() {
        props.actions.submitNewTask();
    }

    function onSubmitUpdateTask() {
        props.actions.submitUpdateTask();
    }

    function onShowTaskDetails(taskId) {
        props.actions.setTaskDetailsDialog(taskId);
    }

    function onAppDialogClose() {
        props.actions.showAppDialog(null);
    }


    const tasks = props.tasks && props.tasks.tasks;
    const shifts = props.app && props.app.appData && props.app.appData.shifts;

    return (
        <>
            <TasksTable data={tasks}
                isDisabled={props.tasks.isDisabled}
                isDeleted={props.tasks.isDeleted}
                isOneTimeTasks={props.tasks.isOneTimeTasks}
                onDisabledChange={onDisabledChange}
                onDeletedChange={onDeletedChange}
                onOneTimeTasksChange={onOneTimeTasksChange}
                onEdit={onOpenUpdateTask}
                onDelete={onDelete}
                onRestore={onRestore}
                onOpenNewTask={onOpenNewTask}
                onShowTaskDetails={onShowTaskDetails}

                openEditTask={props.tasks.isUpdateTaskDialogOpen}
                onEditTaskClose={onCloseUpdateTask}
                editTaskId={props.tasks.updateTask.taskId}
                shifts={shifts}
                task={props.tasks.task}
                onNameChange={onNameChange}
                onDetailsChange={onDetailsChange}
                onProcedureLinkChange={onProcedureLinkChange}
                onShiftChange={onShiftChange}
                onStartTimeChange={onStartTimeChange}
                onTimingTypeChange={onTimingTypeChange}
                onWeekDayChange={onWeekDayChange}
                onMonthDayChange={onMonthDayChange}
                onOneTimeDateChange={onOneTimeDateChange}
                onIsDisabledChange={onIsDisabledChange}
                onSubmitTask={onSubmitUpdateTask}
            />

            <AppConfirm open={props.tasks.deleteTask.isDeleteDialogOpen}
                title="מחיקה"
                message="האם ברצונך למחוק את הסעיף?"
                onAccept={onDeleteTaskAccept}
                onDecline={onDeleteTaskDecline}
            />


            <AppConfirm open={props.tasks.restoreTask.isRestoreDialogOpen}
                title="שחזור"
                message="האם ברצונך לשחזר את הסעיף?"
                onAccept={onRestoreTaskAccept}
                onDecline={onRestoreTaskDecline}
            />

            <NewTaskDialog
                open={props.tasks.isNewTaskDialogOpen}
                onClose={onCloseNewTask}
                task={props.tasks.task}
                title="יצירת סעיף"
                shifts={shifts}
                onNameChange={onNameChange}
                onDetailsChange={onDetailsChange}
                onProcedureLinkChange={onProcedureLinkChange}
                onShiftChange={onShiftChange}
                onStartTimeChange={onStartTimeChange}
                onOneTimeDateChange={onOneTimeDateChange}
                onTimingTypeChange={onTimingTypeChange}
                onWeekDayChange={onWeekDayChange}
                onMonthDayChange={onMonthDayChange}
                onIsDisabledChange={onIsDisabledChange}
                onSubmitTask={onSubmitNewTask}
            />

            {/* <EditTaskDialog
                open={props.tasks.isUpdateTaskDialogOpen}
                onClose={onCloseUpdateTask}
                task={props.tasks.task}
                title="עריכת סעיף"
                shifts={shifts}
                onNameChange={onNameChange}
                onDetailsChange={onDetailsChange}
                onProcedureLinkChange={onProcedureLinkChange}
                onShiftChange={onShiftChange}
                onStartTimeChange={onStartTimeChange}
                onTimingTypeChange={onTimingTypeChange}
                onWeekDayChange={onWeekDayChange}
                onMonthDayChange={onMonthDayChange}
                onIsDisabledChange={onIsDisabledChange}
                onSubmitTask={onSubmitUpdateTask}
            /> */}

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
        tasks: state.tasks,
        app: state.app,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: Object.assign({},
            bindActionCreators(TasksActionCreators, dispatch),
            bindActionCreators(AppActionCreators, dispatch),
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskController);
