export default {
    appProvider: {
        getAppData: {
            path: 'api/app/GetAppData',
        },
    },
    taskProvider: {
        getTask: {
            path: 'api/task/getTask',
        },
        getTasks: {
            path: 'api/task/getTasks',
        },
        getUserTasks: {
            path: 'api/task/getUserTasks',
        },
        updateTask: {
            path: 'api/task/updateTask',
        },
        createTask: {
            path: 'api/task/createTask',
        },
        deleteTask: {
            path: 'api/task/deleteTask',
        },
        restoreTask: {
            path: 'api/task/restoreTask',
        },
        setTaskStatus: {
            path: 'api/task/setTaskStatus',
        },
        setTaskComments: {
            path: 'api/task/setTaskComments',
        },
        resetTasks: {
            path: 'api/task/resetTasks',
        },
        createOneTimeTask: {
            path: 'api/task/createOneTimeTask',
        },
        updateOneTimeTask: {
            path: 'api/task/updateOneTimeTask',
        },
    },
    tasksLogProvider: {
        getTasksLog: {
            path: 'api/taskLog/getTasksLog',
        },
    },
    shiftProvider: {
        setActiveShift: {
            path: 'api/shift/setActiveShift',
        }
    },
}