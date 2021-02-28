import ActionTypes from '../constants/actionTypes';
import fetchStatus from '../constants/fetchStatus';

const initialState = {
    tasks: [],
}

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_TASKS_LOG: {
            return {
                ...state,
                fetchTasksLogStatus: fetchStatus.PENDING,
            }
        }
        case ActionTypes.FETCH_TASKS_LOG_SUCCESS: {
            return {
                ...state,
                fetchTasksLogStatus: fetchStatus.SUCCESS,
                tasks: action.payload,
                tasksError: null,
            }
        }
        case ActionTypes.FETCH_TASKS_LOG_FAIL: {
            return {
                ...state,
                fetchTasksLogStatus: fetchStatus.FAILED,
                tasks: null,
                tasksError: action.error,
            }
        }
        case ActionTypes.SET_TASK_LOG_DATE: {
            return {
                ...state,
                date: action.date,
            }
        }
        case ActionTypes.SET_TASK_LOG_SHIFT_ID: {
            return {
                ...state,
                shiftId: action.shiftId,
            }
        }
        default: return state;
    }
}