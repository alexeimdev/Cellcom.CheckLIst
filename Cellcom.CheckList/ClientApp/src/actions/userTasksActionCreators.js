import _ from 'lodash';
import ActionTypes from '../constants/actionTypes';
import taskProvider from '../providers/taskProvider';
import shiftProvider from '../providers/shiftProvider';
import configureStore from './../store/configureStore';
import helper from '../helpers/helper';
import actionStatus from '../constants/actionStatus';
import * as AppActionCreators from '../actions/appActionCreators';
import TaskStatus from '../constants/taskStatus';

const store = configureStore();


export function openShiftSelectorDialog(isOpen) {
    return { type: ActionTypes.SET_SHIFT_SELECTOR_DIALOG, isOpen }
}

export function setActiveShiftId(shiftId) {
    return (dispatch) => {

        shiftProvider.setActiveShift(shiftId)
            .then(data => {
                if (data) {
                    dispatch({ type: ActionTypes.SET_ACTIVE_SHIFT_ID, shiftId });
                    dispatch(fetchUserTasks(true));
                }
                else {
                }
            })
            .catch(error => {
            })
            .finally(x => {
            });
    }
}

export function fetchUserTasks(showLoader) {
    return (dispatch) => {
        const state = store.getState();
        const userTasks = state.userTasks;
        const activeShiftId = userTasks.activeShiftId  
        
        dispatch({ type: ActionTypes.FETCH_USER_TASKS });

        if (showLoader) {
            dispatch(AppActionCreators.showAppLoader());
        }

        return taskProvider.getUserTasks(activeShiftId)
            .then(data => {
                if (data) {
                    dispatch(fetchUserTasksSuccess(data));
                }
                else {
                    dispatch(AppActionCreators.showAppSnackbar("לא התקבלו נתונים!", "error"));
                    dispatch(fetchUserTasksFail("no data"));
                }
            })
            .catch(error => {
                dispatch(fetchUserTasksFail(error));
                dispatch(AppActionCreators.showAppSnackbar("לא התקבלו נתונים!", "error"));
            })
            .finally(x => {
                if (showLoader) {
                    dispatch(AppActionCreators.hideAppLoader());
                }
            });
    }
}

function fetchUserTasksSuccess(payload) {
    return { type: ActionTypes.FETCH_USER_TASKS_SUCCESS, payload };
}

function fetchUserTasksFail(error) {
    return { type: ActionTypes.FETCH_USER_TASKS_FAIL, error }
}

export function submitTaskStatus(taskId, status) {
    return (dispatch) => {

        dispatch({ type: ActionTypes.SUBMIT_TASK_STATUS });
        taskProvider.setTaskStatus(taskId, status)
            .then(data => {
                if (data) {
                    dispatch({ type: ActionTypes.SUBMIT_TASK_STATUS_SUCCESS });
                    dispatch(fetchUserTasks());
                }
                else {
                    dispatch({ type: ActionTypes.SUBMIT_TASK_STATUS_FAIL });
                    dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
                }
            })
            .catch(error => {
                dispatch({ type: ActionTypes.SUBMIT_TASK_STATUS_FAIL });
                dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
            })
    }
}


export function setTaskIsRunning(taskId) {
    return (dispatch) => {
        const state = store.getState();
        const userTasks = state.userTasks;
        const tasks = userTasks.tasks;
        const task = tasks.find(x => x.id == taskId);

        const statusObj = Object.entries(TaskStatus);
        const status = statusObj[task.status][0];

        if (status == TaskStatus.PENDING || status == TaskStatus.UNDONE) {
            dispatch(submitTaskStatus(taskId, TaskStatus.RUNNING));   
        }
    }
}

export function setTaskProgress(taskId, progress) {
    const payload = {
        taskId,
        progress,
    }
    return { type: ActionTypes.SET_TASK_PROGRESS, payload };
}

export function setTaskComments(taskId, comments) {
    const payload = {
        taskId,
        comments,
    }
    return { type: ActionTypes.SET_TASK_COMMENTS, payload };
}

export function setTaskCommentsIsDirty(taskId, isCommentsDirty) {
    const payload = {
        taskId,
        isCommentsDirty,
    }
    return { type: ActionTypes.SET_TASK_COMMENTS_IS_DIRTY, payload };
}

export function submitTaskComments(taskId) {
    return (dispatch) => {
        const state = store.getState();
        const userTasks = state.userTasks;
        const tasks = userTasks.tasks;
        const task = tasks.find(x => x.id == taskId);

        dispatch({ type: ActionTypes.SUBMIT_TASK_COMMENTS });

        taskProvider.setTaskComments(taskId, task.comments)
            .then(data => {
                if (data) {
                    dispatch({ type: ActionTypes.SUBMIT_TASK_COMMENTS_SUCCESS });
                    dispatch(fetchUserTasks());
                    dispatch(setTaskCommentsIsDirty(taskId, false));
                }
                else {
                    dispatch({ type: ActionTypes.SUBMIT_TASK_COMMENTS_FAIL });
                    dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
                }
            })
            .catch(error => {
                dispatch({ type: ActionTypes.SUBMIT_TASK_COMMENTS_FAIL });
                dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
            })
    }
}

export function openUserTaskResetConfirm(isOpen) {
    return { type: ActionTypes.OPEN_USER_TASKS_RESET_CONFIRM, isOpen };
}

export function submitUserTaskReset() {
    return (dispatch) => {
        const state = store.getState();
        const userTasks = state.userTasks;
        const activeShiftId = userTasks.activeShiftId

        dispatch({ type: ActionTypes.SUBMIT_USER_TASKS_RESET });

        taskProvider.resetTasks(activeShiftId)
            .then(data => {
                if (data) {
                    dispatch({ type: ActionTypes.SUBMIT_USER_TASKS_RESET_SUCCESS });
                    dispatch(fetchUserTasks());
                }
                else {
                    dispatch({ type: ActionTypes.SUBMIT_USER_TASKS_RESET_FAIL });
                    dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
                }
            })
            .catch(error => {
                dispatch({ type: ActionTypes.SUBMIT_USER_TASKS_RESET_FAIL });
                dispatch(AppActionCreators.showAppSnackbar("הפעולה נכשלה!", "error"));
            })

    }
}