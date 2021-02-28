import ActionTypes from '../constants/actionTypes';
import fetchStatus from '../constants/fetchStatus';

const initialState = {
    isShiftSelectorDialogOpen: true,
    activeShiftId: -1,
}

export default function userTasks(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_SHIFT_SELECTOR_DIALOG: {
            return {
                ...state,
                isShiftSelectorDialogOpen: action.isOpen,
            }
        }
        case ActionTypes.SET_ACTIVE_SHIFT_ID: {
            return {
                ...state,
                activeShiftId: action.shiftId,
            }
        }
        case ActionTypes.FETCH_USER_TASKS: {
            return {
                ...state,
                fetchUserTasksStatus: fetchStatus.PENDING,
            }
        }
        case ActionTypes.FETCH_USER_TASKS_SUCCESS: {
            const prevTasks = state.tasks;
            let newTasks = action.payload;

            // preserve prev UI state
            if (prevTasks && prevTasks.length > 0) {
                newTasks = newTasks.map(item => {

                    const prevItem = prevTasks.find(x => x.id == item.id);

                    if (prevItem) {
                        return {
                            ...prevItem,
                            ...item,
                        }
                    }
                    else {
                        return {
                            ...item,
                        }
                    }
                });
            }

            return {
                ...state,
                fetchUserTasksStatus: fetchStatus.SUCCESS,
                tasks: newTasks,
                tasksError: null,
            }
        }
        case ActionTypes.FETCH_USER_TASKS_FAIL: {
            return {
                ...state,
                fetchUserTasksStatus: fetchStatus.FAILED,
                tasks: null,
                tasksError: action.error,
            }
        }
        case ActionTypes.SET_TASK_PROGRESS: {

            const modifiedTasks = state.tasks.map(item => {
                if (item.id == action.payload.taskId) {
                    return {
                        ...item,
                        progress: action.payload.progress,
                    }
                }
                else {
                    return {
                        ...item
                    }
                }
            })

            return {
                ...state,
                tasks: modifiedTasks,
            }
        }
        case ActionTypes.SET_TASK_COMMENTS_IS_DIRTY: {
            const modifiedTasks = state.tasks.map(item => {
                if (item.id == action.payload.taskId) {
                    return {
                        ...item,
                        isCommentsDirty: action.payload.isCommentsDirty,
                    }
                }
                else {
                    return {
                        ...item
                    }
                }
            })

            return {
                ...state,
                tasks: modifiedTasks,
            }
        }
        case ActionTypes.SET_TASK_COMMENTS: {
            const modifiedTasks = state.tasks.map(item => {
                if (item.id == action.payload.taskId) {
                    return {
                        ...item,
                        comments: action.payload.comments,
                    }
                }
                else {
                    return {
                        ...item
                    }
                }
            })

            return {
                ...state,
                tasks: modifiedTasks,
            }
        }
        case ActionTypes.OPEN_USER_TASKS_RESET_CONFIRM: {
            return {
                ...state,
                openUserTasksResetConfirm: action.isOpen,
            }
        }
        default: return state;
    }

}