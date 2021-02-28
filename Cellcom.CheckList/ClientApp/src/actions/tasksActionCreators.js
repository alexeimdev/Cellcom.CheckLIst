import _ from 'lodash';
import ActionTypes from '../constants/actionTypes';
import taskProvider from '../providers/taskProvider';
import validationStatus from '../constants/validationStatus';
import taskTimingType from '../constants/taskTimingType';
import configureStore from './../store/configureStore';
import helper from '../helpers/helper';
import actionStatus from '../constants/actionStatus';
import * as AppActionCreators from '../actions/appActionCreators';
//import strings from '../languages/strings';

const store = configureStore();

export function setIsDisabledTasks(isDisabled) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SET_IS_DISABLED_TASKS, isDisabled });
        dispatch(fetchTasks());
    }
}

export function setIsDeletedTasks(isDeleted) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SET_IS_DELETED_TASKS, isDeleted });
        dispatch(fetchTasks());
    }
}

export function setIsOneTimeTasks(isOneTimeTasks) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SET_IS_ONE_TIME_TASKS, isOneTimeTasks });
        dispatch(fetchTasks());
    }
}



export function fetchTasks() {
    return (dispatch) => {

        const state = store.getState();
        const tasks = state.tasks;
        const { isDisabled, isDeleted, isOneTimeTasks } = tasks;

        dispatch({ type: ActionTypes.FETCH_TASKS });
        dispatch(AppActionCreators.showAppLoader());

        return taskProvider.getTasks(isDisabled, isDeleted, isOneTimeTasks)
            .then(data => {
                if (data) {
                    dispatch(fetchTasksSuccess(data));
                }
                else {
                    dispatch(AppActionCreators.showAppSnackbar("שגיאה בקבלת הנתונים", "error"));
                    dispatch(fetchTasksFail("no data"));
                }
            })
            .catch(error => {
                dispatch(fetchTasksFail(error));
                dispatch(AppActionCreators.showAppSnackbar("שגיאה בקבלת הנתונים", "error"));
            })
            .finally(x => {
                dispatch(AppActionCreators.hideAppLoader());
            });
    }
}

function fetchTasksSuccess(payload) {
    return { type: ActionTypes.FETCH_TASKS_SUCCESS, payload }
}

function fetchTasksFail(error) {
    return { type: ActionTypes.FETCH_TASKS_FAIL, error }
}


// Delete task
export function openDeleteTaskDialog(isOpen) {
    return ({ type: ActionTypes.SET_DELETE_DIALOG, isOpen })
}

export function setDeleteTaskId(taskId) {
    return ({ type: ActionTypes.SET_DELETE_TASK_ID, taskId })
}

export function deleteTask() {
    return (dispatch) => {

        const state = store.getState();
        const tasks = state.tasks;
        const { taskId } = tasks.deleteTask;

        dispatch({ type: ActionTypes.DELETE_TASK, taskId });
        dispatch(AppActionCreators.showAppLoader());

        return taskProvider.deleteTask(taskId)
            .then(data => {
                if (data) {
                    dispatch(deleteTaskSuccess(data));
                    dispatch(AppActionCreators.showAppSnackbar("המחיקה בוצעה בהצלחה!", "success"));
                    dispatch(fetchTasks());
                }
                else {
                    dispatch(AppActionCreators.showAppSnackbar("המחיקה נכשלה!", "error"));
                    dispatch(deleteTaskFail("no data"));
                }
            })
            .catch(error => {
                dispatch(deleteTaskFail(error));
                dispatch(AppActionCreators.showAppSnackbar("המחיקה נכשלה!", "error"));
            })
            .finally(x => {
                dispatch(setDeleteTaskId(null));
                dispatch(AppActionCreators.hideAppLoader());
            });
    }
}

function deleteTaskSuccess(payload) {
    return { type: ActionTypes.DELETE_TASK_SUCCESS, payload }
}

function deleteTaskFail(error) {
    return { type: ActionTypes.DELETE_TASK_FAIL, error }
}


// Restore task
export function openRestoreTaskDialog(isOpen) {
    return ({ type: ActionTypes.SET_RESTORE_DIALOG, isOpen })
}

export function setRestoreTaskId(taskId) {
    return ({ type: ActionTypes.SET_RESTORE_TASK_ID, taskId })
}

export function restoreTask() {
    return (dispatch) => {
        const state = store.getState();
        const tasks = state.tasks;
        const { taskId } = tasks.restoreTask;

        dispatch({ type: ActionTypes.RESTORE_TASK, taskId });
        dispatch(AppActionCreators.showAppLoader());

        return taskProvider.restoreTask(taskId)
            .then(data => {
                if (data) {
                    dispatch(restoreTaskSuccess(data));
                    dispatch(AppActionCreators.showAppSnackbar("השיחזור בוצע בהצלחה!", "success"));
                    dispatch(fetchTasks());
                }
                else {
                    dispatch(restoreTaskFail("no data"));
                    dispatch(AppActionCreators.showAppSnackbar("השחזור נכשל!", "error"));
                }
            })
            .catch(error => {
                dispatch(restoreTaskFail(error));
                dispatch(AppActionCreators.showAppSnackbar("השחזור נכשל!", "error"));
            })
            .finally(x => {
                dispatch(setRestoreTaskId(null));
                dispatch(AppActionCreators.hideAppLoader());
            });
    }
}

function restoreTaskSuccess(payload) {
    return { type: ActionTypes.RESTORE_TASK_SUCCESS, payload }
}

function restoreTaskFail(error) {
    return { type: ActionTypes.RESTORE_TASK_FAIL, error }
}



// Task
export function openNewTaskDialog(isOpen) {
    return ({ type: ActionTypes.SET_NEW_TASK_DIALOG, isOpen })
}

export function setTaskName(name) {
    return (dispatch) => {
        dispatch(setTaskNameError(null));
        dispatch({ type: ActionTypes.SET_TASK_NAME, name })
    }
}

export function setTaskDetails(details) {
    return ({ type: ActionTypes.SET_TASK_DETAILS, details })
}

export function setTaskProcedureLink(link) {
    return ({ type: ActionTypes.SET_TASK_PROCEDURE_LINK, link })
}

export function setTaskStartTime(startTime) {

    const state = store.getState();
    const tasks = state.tasks;
    const task = tasks.task;
    const prevStartTime = task.startTime;
    let newStartTime = prevStartTime;

    return (dispatch) => {
        dispatch(setTaskStartTimeError(null));

        if (startTime.length <= 5) {
            if (startTime.length == 2 && startTime > prevStartTime) {
                startTime += ":";
            }
            newStartTime = startTime;
        }
        dispatch({ type: ActionTypes.SET_TASK_START_TIME, startTime: newStartTime });
        
        if (startTime.length == 5)  {
            if (task.timingType == taskTimingType.ONE_TIME) {
                const localeDate = getLocaleDate(task.timingOneTimeDate)
                dispatch(setTaskOneTimeDate(localeDate));
            }
        }
    }
}

export function setTaskShiftId(shiftId) {
    return (dispatch) => {
        dispatch(setTaskShiftIdError(null));
        dispatch({ type: ActionTypes.SET_TASK_SHIFT_ID, shiftId });
    }
}

export function setTaskTimingType(timingType) {
    return (dispatch) => {
        dispatch(setTaskTimingTypeError(null));
        dispatch(setTaskTimingValues(null));
        dispatch(setTaskTimingValuesError(null));
        dispatch({ type: ActionTypes.SET_TASK_TIMING_TYPE, timingType });
    }
}

function setTaskTimingValues(values) {
    return (dispatch) => {
        dispatch(setTaskTimingValuesError(null));
        dispatch(setOneTimeDateError(null));
        ////dispatch(setTaskOneTimeDate(null));
        dispatch({ type: ActionTypes.SET_TASK_TIMING_VALUES, values });
    }
}

export function setTaskOneTimeDate(date) {
    return (dispatch) => {

        dispatch(setTaskTimingValuesError(null));
        dispatch(setOneTimeDateError(null));

        if (date != null) {
            date = getLocaleDate(date);   
        }

        dispatch({ type: ActionTypes.SET_TASK_ONE_TIME_DATE, date })
    }
}

export function setTaskWeekDay(day, isChecked) {
    return (dispatch) => {

        const state = store.getState();
        const tasks = state.tasks;
        const task = tasks.task;
        const prevTimingValues = task.timingValues;

        let newTimingValuesArray = prevTimingValues ? prevTimingValues.split(',') : [];

        if (isChecked) {
            newTimingValuesArray.push(day);
        }
        else {
            newTimingValuesArray = newTimingValuesArray.filter(x => x != day);
        }

        const newTimingValues = newTimingValuesArray.join(',');
        dispatch(setTaskTimingValues(newTimingValues));
    }
}

export function setTaskMonthDay(day) {
    return (dispatch) => {

        const state = store.getState();
        const tasks = state.tasks;
        const task = tasks.task;
        const prevTimingValues = task.timingValues;

        let newTimingValuesArray = prevTimingValues ? prevTimingValues.split(',') : [];

        if (newTimingValuesArray.includes(day.toString())) {
            newTimingValuesArray = newTimingValuesArray.filter(x => x != day);
        }
        else {
            newTimingValuesArray.push(day);
        }

        const newTimingValues = newTimingValuesArray.sort().join(',');
        dispatch(setTaskTimingValues(newTimingValues));
    }
}

export function setTaskIsDisabled(checked) {
    return ({ type: ActionTypes.SET_TASK_IS_DISABLED, checked })
}

export function clearTask() {
    return ({ type: ActionTypes.CLEAR_TASK })
}

export function setTaskDetailsDialog(taskId) {
    return (dispatch) => {
        const state = store.getState();
        const tasks = state.tasks.tasks;
        const task = tasks.find(x => x.id == taskId);
        if (task) {
            dispatch(AppActionCreators.showAppDialog("פירוט הסעיף", task.details));
        }
    }
}


// Task Error
function setTaskNameError(error) {
    return ({ type: ActionTypes.SET_TASK_NAME_ERROR, error })
}

function setTaskShiftIdError(error) {
    return ({ type: ActionTypes.SET_TASK_SHIFT_ID_ERROR, error })
}

function setTaskTimingTypeError(error) {
    return ({ type: ActionTypes.SET_TASK_TIMING_TYPE_ERROR, error })
}

function setTaskStartTimeError(error) {
    return ({ type: ActionTypes.SET_TASK_START_TIME_ERROR, error })
}

function setTaskTimingValuesError(error) {
    return ({ type: ActionTypes.SET_TASK_TIMING_VALUES_ERROR, error })
}

function setOneTimeDateError(error) {
    return ({ type: ActionTypes.SET_TASK_ONE_TIME_DATE_ERROR, error })
}

function setTaskValidationStatus(status) {
    return ({ type: ActionTypes.SET_TASK_VALIDATION_STATUS, status })
}

// Submit Task
export function submitNewTask() {
    return (dispatch) => {

        const state = store.getState();
        const tasks = state.tasks;
        const task = tasks.task;

        let isError = false;

        if (!task.name) {
            dispatch(setTaskNameError("שדה חובה"));
            isError = true;
        }
        if (task.shiftId == null || task.shiftId === "") {
            dispatch(setTaskShiftIdError("שדה חובה"));
            isError = true;
        }
        if (task.timingType == null || task.timingType === "") {
            dispatch(setTaskTimingTypeError("שדה חובה"));
            isError = true;
        }
        if (!task.startTime) {
            dispatch(setTaskStartTimeError("שדה חובה"));
            isError = true;
        }
        if ((task.timingType == taskTimingType.WEEKLY || task.timingType == taskTimingType.MOUNTLY) && !task.timingValues) {
            dispatch(setTaskTimingValuesError("יש לבחור ערך אחד לפחות"));
            isError = true;
        }
        if (task.timingType == taskTimingType.ONE_TIME && !task.timingOneTimeDate) {
            dispatch(setOneTimeDateError("יש לבחור ערך"));
            isError = true;
        }

        if (isError) {
            dispatch(setTaskSubmitStatus(actionStatus.CANCELED));
            dispatch(setTaskValidationStatus(validationStatus.FAIL));
        }
        else {
            dispatch(setTaskValidationStatus(validationStatus.PASS));
            dispatch(setTaskSubmitStatus(actionStatus.PENDING));
            dispatch(AppActionCreators.showAppLoader());

            taskProvider.createTask(task.name, task.details, task.procedureLink, task.shiftId, task.timingType, task.timingValues, task.startTime, task.isDisabled, task.timingOneTimeDate)
                .then(result => {
                    if (result) {
                        dispatch(fetchTasks());
                        dispatch(setTaskSubmitStatus(actionStatus.SUCCESS));
                        dispatch(clearTask());
                        dispatch(openNewTaskDialog(false));
                        dispatch(AppActionCreators.showAppSnackbar("יצירת סעיף חדש בוצעה בהצלחה!", "success"));
                    }
                    else {
                        dispatch(setTaskSubmitStatus(actionStatus.FAIL));
                        dispatch(AppActionCreators.showAppSnackbar("יצירת סעיף נכשלה!", "error"));
                    }
                })
                .catch(err => {
                    dispatch(setTaskSubmitStatus(actionStatus.FAIL));
                    dispatch(AppActionCreators.showAppSnackbar("יצירת סעיף נכשלה!", "error"));
                })
                .finally(x => {
                    dispatch(AppActionCreators.hideAppLoader());
                })
        }
    }
} 


// Update Task
export function setUpdateTaskId(taskId) {
    return ({ type: ActionTypes.SET_UPDATE_TASK_ID, taskId })
}

export function openUpdateTaskDialog(isOpen) {
    return ({ type: ActionTypes.SET_UPDATE_TASK_DIALOG, isOpen })
}

function setTaskSubmitStatus(status) {
    return ({ type: ActionTypes.SET_TASK_SUBMIT_STATUS, status })
}

export function submitUpdateTask() {
    return (dispatch) => {

        const state = store.getState();
        const tasks = state.tasks;
        const task = tasks.task;
        const updateTask = tasks.updateTask;
        const taskId = updateTask.taskId;

        let isError = false;

        if (!task.name) {
            dispatch(setTaskNameError("שדה חובה"));
            isError = true;
        }
        if (task.shiftId == null) {
            dispatch(setTaskShiftIdError("שדה חובה"));
            isError = true;
        }
        if (task.timingType == null) {
            dispatch(setTaskTimingTypeError("שדה חובה"));
            isError = true;
        }
        if (!task.startTime) {
            dispatch(setTaskStartTimeError("שדה חובה"));
            isError = true;
        }
        if ((task.timingType == taskTimingType.WEEKLY || task.timingType == taskTimingType.MOUNTLY) && !task.timingValues) {
            dispatch(setTaskTimingValuesError("יש לבחור ערך אחד לפחות"));
            isError = true;
        }
        if (task.timingType == taskTimingType.ONE_TIME && !task.timingOneTimeDate) {
            dispatch(setOneTimeDateError("יש לבחור ערך"));
            isError = true;
        }

        if (isError) {
            dispatch(setTaskSubmitStatus(actionStatus.CANCELED));
            dispatch(setTaskValidationStatus(validationStatus.FAIL));
        }
        else {
            dispatch(setTaskSubmitStatus(actionStatus.PENDING));
            dispatch(setTaskValidationStatus(validationStatus.PASS));
            dispatch(AppActionCreators.showAppLoader());

            taskProvider.updateTask(taskId, task.name, task.details, task.procedureLink, task.shiftId, task.timingType, task.timingValues, task.startTime, task.isDisabled, task.timingOneTimeDate)
                .then(result => {
                    if (result) {
                        dispatch(fetchTasks());
                        dispatch(setTaskSubmitStatus(actionStatus.SUCCESS));
                        dispatch(clearTask());
                        dispatch(openUpdateTaskDialog(false));
                        dispatch(AppActionCreators.showAppSnackbar("עדכון הסעיף בוצע בהצלחה!", "success"));
                    }
                    else {
                        dispatch(setTaskSubmitStatus(actionStatus.FAIL));
                        dispatch(AppActionCreators.showAppSnackbar("עדכון הסעיף נכשל!", "error"));

                    }
                })
                .catch(err => {
                    dispatch(setTaskSubmitStatus(actionStatus.FAIL));
                    dispatch(AppActionCreators.showAppSnackbar("עדכון הסעיף נכשל!", "error"));
                })
                .finally(x => {
                    dispatch(AppActionCreators.hideAppLoader());
                })
        }
    }
} 


export function fetchTask() {
    return (dispatch) => {
        const state = store.getState();
        const tasks = state.tasks;
        const updateTask = tasks.updateTask;
        const { taskId } = updateTask;

        dispatch({ type: ActionTypes.FETCH_TASK });
        dispatch(AppActionCreators.showAppLoader());

        return taskProvider.getTask(taskId)
            .then(data => {
                if (data) {
                    dispatch(fetchTaskSuccess(data));
                }
                else {
                    dispatch(AppActionCreators.showAppSnackbar("פתיחת עריכה נכשלה!", "error"));
                    dispatch(fetchTaskFail("no data"));
                }
            })
            .catch(error => {
                dispatch(fetchTaskFail(error));
                    dispatch(AppActionCreators.showAppSnackbar("פתיחת עריכה נכשלה!", "error"));
            })
            .finally(x => {
                dispatch(AppActionCreators.hideAppLoader());
            });
    }
}

function fetchTaskSuccess(payload) {
    return { type: ActionTypes.FETCH_TASK_SUCCESS, payload }
}

function fetchTaskFail(error) {
    return { type: ActionTypes.FETCH_TASK_FAIL, error }
}



// OneTime Task
export function resetOneTimeTask() {
    return {type: ActionTypes.RESET_ONE_TIME_TASK}
}

export function openOneTimeTaskDialog(isOpen) {
    return { type: ActionTypes.OPEN_ONE_TIME_TASK_DIALOG, isOpen }
}

export function setOneTimeTaskName(name) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SET_ONE_TIME_TASK_NAME, name })
        dispatch(setOneTimeTaskNameError(null));
    }
}

export function setOneTimeTaskDateTime(dateTime) {
    return { type: ActionTypes.SET_ONE_TIME_TASK_DATE_TIME, dateTime }
}

export function setOneTimeTaskDetails(details) {
    return { type: ActionTypes.SET_ONE_TIME_TASK_DETAILS, details }
}

export function setOneTimeTaskComments(comments) {
    return { type: ActionTypes.SET_ONE_TIME_TASK_COMMENTS, comments }
}

// Errors
function setOneTimeTaskNameError(error) {
    return { type: ActionTypes.SET_ONE_TIME_TASK_NAME_ERROR, error }
}

export function submitOneTimeTask() {
    return (dispatch) => {

        const state = store.getState();
        const tasks = state.tasks;
        const oneTimeTask = tasks.oneTimeTask;
        
        const name = oneTimeTask.name;
        const details = oneTimeTask.details || "";
        const comments = oneTimeTask.comments || "";
        const startDate = oneTimeTask.dateTime;
        const startTime = helper.getTimeFromDate(oneTimeTask.dateTime);
        
        let isError = false;

        if (!name) {
            dispatch(setOneTimeTaskNameError("שדה חובה"));
            isError = true;
        }

        if (!isError) {
            dispatch({ type: ActionTypes.SUBMIT_ONE_TIME_TASK });
            taskProvider.createOneTask(name, details, comments, startDate, startTime)
                .then(data => {
                    if (data) {
                        dispatch({ type: ActionTypes.SUBMIT_ONE_TIME_TASK_SUCCESS });
                        dispatch(openOneTimeTaskDialog(false));
                    }
                    else {
                        dispatch({ type: ActionTypes.SUBMIT_ONE_TIME_TASK_FAIL });
                        dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
                    }
                })
                .catch(error => {
                    dispatch({ type: ActionTypes.SUBMIT_ONE_TIME_TASK_FAIL, error });
                    dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
               })
        }
    }
} 



// Local helpers
function getLocaleDate(date) {
    const now = new Date();
    const state = store.getState();
    const tasks = state.tasks;
    const task = tasks.task;
    const startTime = task.startTime;
    
    const splittedTime = startTime.split(":");
    if (startTime.length == 5 || splittedTime.length == 2) { // startTime exists
        let newDate = new Date(date);
        newDate.setHours(splittedTime[0]);
        newDate.setMinutes(splittedTime[1]);
    
        var userTimezoneOffset = now.getTimezoneOffset() * 60000;
        const localeDate = new Date(newDate.getTime() - userTimezoneOffset);
        return localeDate;
    }
    else {
        return date;
    }
}