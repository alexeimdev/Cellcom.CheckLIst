import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import app from './appReducer';
import clock from './clockReducer';
import tasks from './tasksReducer';
import userTasks from './userTasksReducer';
import tasksLog from './tasksLogReducer';

const rootReducer = combineReducers({
	ajaxCallsInProgress,
    app,
    clock,
    tasks,
    userTasks,
    tasksLog,
});

export default rootReducer;
