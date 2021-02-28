import ActionTypes from '../constants/actionTypes';
import fetchStatus from '../constants/fetchStatus';

const initialTaskState = {
    name: '',
    details: '',
    procedureLink: '',
    shiftId: '',
    startTime: '',
    timingType: '',
    timingValues: '',
    timingOneTimeDate: '',
    isDisabled: false,
}

const initialOneTimeTaskState = {
    dateTime: new Date(),
}

const initialState = {
    isDisabled: false,
    isDeleted: false,
    isOneTimeTasks: false,
    isTaskDialogOpen: false,

    deleteTask: {
        taskId: null,
    },

    restoreTask: {
        taskId: null,
    },

    updateTask: {
        taskId: null,
    },

    oneTimeTask: initialOneTimeTaskState,

    task: initialTaskState,
}

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_IS_DISABLED_TASKS: {
            return {
                ...state,
                isDisabled: action.isDisabled,
            }
        }
        case ActionTypes.SET_IS_DELETED_TASKS: {
            return {
                ...state,
                isDeleted: action.isDeleted,
            }
        }
        case ActionTypes.SET_IS_ONE_TIME_TASKS: {
            return {
                ...state,
                isOneTimeTasks: action.isOneTimeTasks,
            }
        }
        case ActionTypes.FETCH_TASKS: {
            return {
                ...state,
                fetchTasksStatus: fetchStatus.PENDING,
            }
        }
        case ActionTypes.FETCH_TASKS_SUCCESS: {
            return {
                ...state,
                fetchTasksStatus: fetchStatus.SUCCESS,
                tasks: action.payload,
                tasksError: null,
            }
        }
        case ActionTypes.FETCH_TASKS_FAIL: {
            return {
                ...state,
                fetchTasksStatus: fetchStatus.FAILED,
                tasks: null,
                tasksError: action.error,
            }
        }
        // Delete task
        case ActionTypes.SET_DELETE_TASK_ID: {
            const taskId = action.taskId ? action.taskId : null;

            return {
                ...state,
                deleteTask: {
                    ...state.deleteTask,
                    taskId: taskId,
                },
            }
        }
        case ActionTypes.SET_DELETE_DIALOG: {
            return {
                ...state,
                deleteTask: {
                    ...state.deleteTask,
                    isDeleteDialogOpen: action.isOpen,
                },
            }
        }
        case ActionTypes.DELETE_TASK_SUCCESS: {
            return {
                ...state,
                deleteTask: {
                    ...state.deleteTask,
                    deleteTaskStatus: fetchStatus.SUCCESS,
                    deleteTaskSuccess: action.payload,
                    deleteTaskFail: null,
                },
            }
        }
        case ActionTypes.DELETE_TASK_FAIL: {
            return {
                ...state,
                deleteTask: {
                    ...state.deleteTask,
                    deleteTaskStatus: fetchStatus.FAILED,
                    deleteTaskSuccess: null,
                    deleteTaskFail: action.error,
                },
            }
        }
        // Restore task
        case ActionTypes.SET_RESTORE_TASK_ID: {
            const taskId = action.taskId ? action.taskId : null;

            return {
                ...state,
                restoreTask: {
                    ...state.restoreTask,
                    taskId: taskId,
                },
            }
        }
        case ActionTypes.SET_RESTORE_DIALOG: {
            return {
                ...state,
                restoreTask: {
                    ...state.restoreTask,
                    isRestoreDialogOpen: action.isOpen,
                },
            }
        }
        case ActionTypes.RESTORE_TASK_SUCCESS: {
            return {
                ...state,
                restoreTask: {
                    ...state.restoreTask,
                    restoreTaskStatus: fetchStatus.SUCCESS,
                    restoreTaskSuccess: action.payload,
                    restoreTaskFail: null,
                },
            }
        }
        case ActionTypes.RESTORE_TASK_FAIL: {
            return {
                ...state,
                restoreTask: {
                    ...state.restoreTask,
                    restoreTaskStatus: fetchStatus.FAILED,
                    restoreTaskSuccess: null,
                    restoreTaskFail: action.error,
                },
            }
        }
        case ActionTypes.RESTORE_TASK: {
            return {
                ...state,
                restoreTask: {
                    ...state.restoreTask,
                    restoreTaskStatus: fetchStatus.PENDING,
                },
            }
        }
        // Set Task
        case ActionTypes.SET_NEW_TASK_DIALOG: {
            return {
                ...state,
                isNewTaskDialogOpen: action.isOpen,
            }
        }
        case ActionTypes.SET_TASK_NAME: {
            return {
                ...state,
                task: {
                    ...state.task,
                    name: action.name,
                },
            }
        }
        case ActionTypes.SET_TASK_DETAILS: {
            return {
                ...state,
                task: {
                    ...state.task,
                    details: action.details,
                },
            }
        }
        case ActionTypes.SET_TASK_PROCEDURE_LINK: {
            return {
                ...state,
                task: {
                    ...state.task,
                    procedureLink: action.link,
                },
            }
        }
        case ActionTypes.SET_TASK_START_TIME: {
            return {
                ...state,
                task: {
                    ...state.task,
                    startTime: action.startTime,
                },
            }
        }
        case ActionTypes.SET_TASK_SHIFT_ID: {
            return {
                ...state,
                task: {
                    ...state.task,
                    shiftId: action.shiftId,
                },
            }
        }
        case ActionTypes.SET_TASK_TIMING_TYPE: {
            return {
                ...state,
                task: {
                    ...state.task,
                    timingType: action.timingType,
                },
            }
        }
        case ActionTypes.SET_TASK_TIMING_VALUES: {
            return {
                ...state,
                task: {
                    ...state.task,
                    timingValues: action.values,
                },
            }
        }
        case ActionTypes.SET_TASK_ONE_TIME_DATE: {
            return {
                ...state,
                task: {
                    ...state.task,
                    timingOneTimeDate: action.date,
                },
            }
        }
        case ActionTypes.SET_TASK_IS_DISABLED: {
            return {
                ...state,
                task: {
                    ...state.task,
                    isDisabled: action.checked,
                },
            }
        }
        case ActionTypes.SET_TASK_VALIDATION_STATUS: {
            return {
                ...state,
                task: {
                    ...state.task,
                    taskValidationStatus: action.status,
                },
            }
        }
        case ActionTypes.SET_TASK_SUBMIT_STATUS: {
            return {
                ...state,
                task: {
                    ...state.task,
                    taskSubmitStatus: action.status,
                },
            }
        }
        case ActionTypes.CLEAR_TASK: {
            return {
                ...state,
                task: initialTaskState,
            }
        }
        // Errors
        case ActionTypes.SET_TASK_NAME_ERROR: {
            return {
                ...state,
                task: {
                    ...state.task,
                    nameError: action.error,
                },
            }
        }
        case ActionTypes.SET_TASK_START_TIME_ERROR: {
            return {
                ...state,
                task: {
                    ...state.task,
                    startTimeError: action.error,
                },
            }
        }
        case ActionTypes.SET_TASK_SHIFT_ID_ERROR: {
            return {
                ...state,
                task: {
                    ...state.task,
                    shiftIdError: action.error,
                },
            }
        }
        case ActionTypes.SET_TASK_TIMING_TYPE_ERROR: {
            return {
                ...state,
                task: {
                    ...state.task,
                    timingTypeError: action.error,
                },
            }
        }
        case ActionTypes.SET_TASK_TIMING_VALUES_ERROR: {
            return {
                ...state,
                task: {
                    ...state.task,
                    timingValuesError: action.error,
                },
            }
        }
        case ActionTypes.SET_TASK_ONE_TIME_DATE_ERROR: {
            return {
                ...state,
                task: {
                    ...state.task,
                    oneTimeDateError: action.error,
                },
            }
        }
        // Update task
        case ActionTypes.SET_UPDATE_TASK_ID: {
            const taskId = action.taskId ? action.taskId : null;

            return {
                ...state,
                updateTask: {
                    ...state.updateTask,
                    taskId: taskId,
                },
            }
        }
        case ActionTypes.SET_UPDATE_TASK_DIALOG: {
            return {
                ...state,
                isUpdateTaskDialogOpen: action.isOpen,
            }
        }
        case ActionTypes.FETCH_TASK: {
            return {
                ...state,
                fetchTaskStatus: fetchStatus.PENDING,
            }
        }
        case ActionTypes.FETCH_TASK_SUCCESS: {
            return {
                ...state,
                task: action.payload,
                fetchTaskStatus: fetchStatus.SUCCESS,
                taskError: null,
            }
        }
        case ActionTypes.FETCH_TASK_FAIL: {
            return {
                ...state,
                task: action.error,
                fetchTaskStatus: fetchStatus.FAILED,
                taskError: action.error,
            }
        }
        // OneTimeTask
        case ActionTypes.RESET_ONE_TIME_TASK: {
            return {
                ...state,
                oneTimeTask: initialOneTimeTaskState,
            }
        }
        case ActionTypes.OPEN_ONE_TIME_TASK_DIALOG: {
            return {
                ...state,
                oneTimeTask: {
                    ...state.oneTimeTask,
                    isOpen: action.isOpen,
                },
            }
        }
        case ActionTypes.SET_ONE_TIME_TASK_NAME: {
            return {
                ...state,
                oneTimeTask: {
                    ...state.oneTimeTask,
                    name: action.name,
                },
            }
        }
        case ActionTypes.SET_ONE_TIME_TASK_DATE_TIME: {
            return {
                ...state,
                oneTimeTask: {
                    ...state.oneTimeTask,
                    dateTime: action.dateTime,
                },
            }
        }
        case ActionTypes.SET_ONE_TIME_TASK_DETAILS: {
            return {
                ...state,
                oneTimeTask: {
                    ...state.oneTimeTask,
                    details: action.details,
                },
            }
        }
        case ActionTypes.SET_ONE_TIME_TASK_COMMENTS: {
            return {
                ...state,
                oneTimeTask: {
                    ...state.oneTimeTask,
                    comments: action.comments,
                },
            }
        }
        case ActionTypes.SET_ONE_TIME_TASK_NAME_ERROR: {
            return {
                ...state,
                oneTimeTask: {
                    ...state.oneTimeTask,
                    nameError: action.error,
                },
            }
        }
        default: return state;
    }

}