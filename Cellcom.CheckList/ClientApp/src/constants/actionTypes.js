import keyMirror from 'keymirror';

export default Object.assign({}, keyMirror({
    // Clock
    SET_TIME: null,


    // Ajax
    BEGIN_AJAX_CALL: null,
    END_AJAX_CALL: null,
    AJAX_CALL_ERROR: null,



    SET_APP_DRAWER: null,

    SET_APP_LOADER: null,

    SET_APP_SNACKBAR: null,

    SET_APP_DIALOG: null,


    // AppData
    FETCH_APP_DATA: null,
    FETCH_APP_DATA_SUCCESS: null,
    FETCH_APP_DATA_FAIL: null,




    // Tasks Table
    SET_IS_DISABLED_TASKS: null,
    SET_IS_DELETED_TASKS: null,
    SET_IS_ONE_TIME_TASKS: null,



    // Fetch Tasks
    FETCH_TASKS: null,
    FETCH_TASKS_SUCCESS: null,
    FETCH_TASKS_FAIL: null,



    // Task
    CREATE_TASK: null,
    SET_TASK_NAME: null,
    SET_TASK_DETAILS: null,
    SET_TASK_PROCEDURE_LINK: null,
    SET_TASK_SHIFT_ID: null,
    SET_TASK_START_TIME: null,
    SET_TASK_TIMING_TYPE: null,
    SET_TASK_TIMING_VALUES: null,
    SET_TASK_ONE_TIME_DATE: null,
    SET_TASK_ONE_WEEK_DAY: null,
    SET_TASK_ONE_MONTH_DAY: null,
    SET_TASK_IS_DISABLED: null,
    SET_TASK_VALIDATION_STATUS: null,
    CLEAR_TASK: null,
    SUBMIT_TASK: null,
    SET_TASK_SUBMIT_STATUS: null,
    SUBMIT_TASK_SUCCESS: null,
    SUBMIT_TASK_FAIL: null,
    SUBMIT_TASK_CANCEL: null,
    // Errors:
    SET_TASK_NAME_ERROR: null,
    SET_TASK_DETAILS_ERROR: null,
    SET_TASK_PROCEDURE_LINK_ERROR: null,
    SET_TASK_SHIFT_ID_ERROR: null,
    SET_TASK_TIMING_TYPE_ERROR: null,
    SET_TASK_TIMING_VALUES_ERROR: null,
    SET_TASK_START_TIME_ERROR: null,
    SET_TASK_ONE_TIME_DATE_ERROR: null,
    SET_TASK_IS_DISABLED_ERROR: null,

    // Dialog
    SET_NEW_TASK_DIALOG: null,
    SET_TASK_DETAILS_DIALOG: null,


    // Update Task
    UPDATE_TASK: null,
    SET_UPDATE_TASK_ID: null,
    // Dialog
    SET_UPDATE_TASK_DIALOG: null,


    // Fetch Task
    FETCH_TASK: null,
    FETCH_TASK_SUCCESS: null,
    FETCH_TASK_FAIL: null,



    // Delete Task
    DELETE_TASK: null,
    DELETE_TASK_SUCCESS: null,
    DELETE_TASK_FAIL: null,
    SET_DELETE_TASK_ID: null,
    // Dialog
    SET_DELETE_DIALOG: null,



    // Restore Task
    RESTORE_TASK: null,
    RESTORE_TASK_SUCCESS: null,
    RESTORE_TASK_FAIL: null,
    SET_RESTORE_TASK_ID: null,
    // Dialog
    SET_RESTORE_DIALOG: null,




    SET_SHIFT_SELECTOR_DIALOG: null,
    SET_ACTIVE_SHIFT_ID: null,


    // Fetch UserTasks
    FETCH_USER_TASKS: null,
    FETCH_USER_TASKS_SUCCESS: null,
    FETCH_USER_TASKS_FAIL: null,

    SET_TASK_PROGRESS: null,
    SET_TASK_COMMENTS: null,
    SET_TASK_COMMENTS_IS_DIRTY: null,

    SUBMIT_TASK_STATUS: null,
    SUBMIT_TASK_STATUS_SUCCESS: null,
    SUBMIT_TASK_STATUS_FAIL: null,

    SUBMIT_TASK_COMMENTS: null,
    SUBMIT_TASK_COMMENTS_SUCCESS: null,
    SUBMIT_TASK_COMMENTS_FAIL: null,

    OPEN_USER_TASKS_RESET_CONFIRM: null,
    SUBMIT_USER_TASKS_RESET: null,
    SUBMIT_USER_TASKS_RESET_SUCCESS: null,
    SUBMIT_USER_TASKS_RESET_FAIL: null,



    
    // One Time task
    OPEN_ONE_TIME_TASK_DIALOG: null,

    RESET_ONE_TIME_TASK: null,
    SET_ONE_TIME_TASK_NAME: null,
    SET_ONE_TIME_TASK_DETAILS: null,
    SET_ONE_TIME_TASK_DATE_TIME: null,
    SET_ONE_TIME_TASK_COMMENTS: null,
    // Errors
    SET_ONE_TIME_TASK_NAME_ERROR: null,


    SUBMIT_ONE_TIME_TASK: null,
    SUBMIT_ONE_TIME_TASK_SUCCESS: null,
    SUBMIT_ONE_TIME_TASK_FAIL: null,


    // Fetch Tasks Log
    FETCH_TASKS_LOG: null,
    FETCH_TASKS_LOG_SUCCESS: null,
    FETCH_TASKS_LOG_FAIL: null,
    FETCH_TASKS_LOG_ABORT: null,

    // Log Task
    SET_TASK_LOG_DATE: null,
    SET_TASK_LOG_SHIFT_ID: null,

}));
