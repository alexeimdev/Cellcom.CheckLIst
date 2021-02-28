import _ from 'lodash';
import ActionTypes from '../constants/actionTypes';
import taskLogProvider from '../providers/taskLogProvider';
import validationStatus from '../constants/validationStatus';
import taskTimingType from '../constants/taskTimingType';
import configureStore from './../store/configureStore';
import helper from '../helpers/helper';
import actionStatus from '../constants/actionStatus';
import * as AppActionCreators from '../actions/appActionCreators';
//import strings from '../languages/strings';

const store = configureStore();

function fetchTasksLog() {
    return (dispatch) => {

        const state = store.getState();
        const tasksLog = state.tasksLog;
        const { date, shiftId } = tasksLog;

        if (date == undefined || shiftId == undefined) {
            dispatch({ type: ActionTypes.FETCH_TASKS_LOG_ABORT });
            return;
        }

        dispatch({ type: ActionTypes.FETCH_TASKS_LOG });
        dispatch(AppActionCreators.showAppLoader());

        return taskLogProvider.getTasksLog(date, shiftId)
            .then(data => {
                if (data) {
                    dispatch(fetchTasksLogSuccess(data));
                }
                else {
                    dispatch(AppActionCreators.showAppSnackbar("שגיאה בקבלת הנתונים", "error"));
                    dispatch(fetchTasksLogFail("no data"));
                }
            })
            .catch(error => {
                dispatch(fetchTasksLogFail(error));
                dispatch(AppActionCreators.showAppSnackbar("שגיאה בקבלת הנתונים", "error"));
            })
            .finally(x => {
                dispatch(AppActionCreators.hideAppLoader());
            });
    }
}

function fetchTasksLogSuccess(payload) {
    return { type: ActionTypes.FETCH_TASKS_LOG_SUCCESS, payload }
}

function fetchTasksLogFail(error) {
    return { type: ActionTypes.FETCH_TASKS_LOG_FAIL, error }
}

export function setTaskDetailsDialog(taskId) {
    return (dispatch) => {
        const state = store.getState();
        const tasks = state.tasksLog.tasks;
        const task = tasks.find(x => x.id == taskId);
        if (task) {
            dispatch(AppActionCreators.showAppDialog("פירוט הסעיף", task.details));
        }
    }
}

export function setTaskLogDate(date) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SET_TASK_LOG_DATE, date });
        dispatch(fetchTasksLog());
    }
}

export function setTaskLogShiftId(shiftId) {
    return (dispatch) => {
        dispatch({ type: ActionTypes.SET_TASK_LOG_SHIFT_ID, shiftId });
        dispatch(fetchTasksLog());
    }
}