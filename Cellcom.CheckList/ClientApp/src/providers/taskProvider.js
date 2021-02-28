import FetchProvider from '../utilities/fetchProvider';
import providersConfigs from '../configs/providersConfigs';
import { Promise } from 'es6-promise';

import TaskModel from '../models/TaskModel';
import UserTaskModel from '../models/UserTaskModel';

export default {

    async getTask(taskId) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['getTask'];

        const url = `/${configs.path}/?taskId=${taskId}`;

        const request = new Request(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        try {
                            const task = result.data;

                            const startTimeArr = task.startTime.split(':');
                            const startTime = `${startTimeArr[0]}:${startTimeArr[1]}`; 

                            return new TaskModel(
                                task.id,
                                task.name,
                                task.details,
                                task.procedureLink,
                                task.shift,
                                task.shift.id,
                                task.timingType,
                                task.timingValues,
                                task.timingOneTimeDate,
                                startTime,
                                task.isDisabled,
                                task.isDeleted,
                                task.createDate,
                                task.updateDate,
                                task.status,
                                task.comments,
                            );
                        } catch (ex) {
                            return Promise.reject("failed to read data. ex:" + ex);
                        }
                    } else {
                        return Promise.reject("error. returnCode" + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async getTasks(isDisabledTasks = false, isDeletedTasks = false, isOneTimeTasks = false) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['getTasks'];

        const url = `/${configs.path}/?isDisabledTasks=${isDisabledTasks}&isDeletedTasks=${isDeletedTasks}&isOneTimeTasks=${isOneTimeTasks}`;

        const request = new Request(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        try {
                            const tasks = result.data.map(t => new TaskModel(
                                t.id,
                                t.name,
                                t.details,
                                t.procedureLink,
                                t.shift,
                                t.shiftId,
                                t.timingType,
                                t.timingValues,
                                t.timingOneTimeDate,
                                t.startTime,
                                t.isDisabled,
                                t.isDeleted,
                                t.createDate,
                                t.updateDate,
                                t.status,
                                t.comments,
                            ));

                            return tasks;

                        } catch (ex) {
                            return Promise.reject("failed to read data. ex:" + ex);
                        }
                    } else {
                        return Promise.reject("error. returnCode" + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async getUserTasks(shiftId) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['getUserTasks'];

        const url = `/${configs.path}/?shiftId=${shiftId}`;

        const request = new Request(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        try {
                            const tasks = result.data.map(t => new UserTaskModel(
                                t.id,
                                t.name,
                                t.details,
                                t.procedureLink,
                                t.shift,
                                t.timingType,
                                t.timingValues,
                                t.timingOneTimeDate,
                                t.startTime,
                                t.status,
                                t.comments,
                            ));

                            return tasks;

                        } catch (ex) {
                            return Promise.reject("failed to read data. ex:" + ex);
                        }
                    } else {
                        return Promise.reject("error. returnCode" + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async updateTask(taskId, name, details, procedureLink, shiftId, timingType, timingValues, startTime, isDisabled, timingOneTimeDate) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['updateTask'];

        const url = `/${configs.path}`;

        const bodyData = {
            taskId,
            name ,
            details,
            procedureLink,
            shiftId,
            timingType,
            timingValues,
            startTime,
            isDisabled,
            timingOneTimeDate,
        };

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async createTask(name, details, procedureLink, shiftId, timingType, timingValues, startTime, isDisabled, timingOneTimeDate) {

        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['createTask'];

        const url = `/${configs.path}`;

        const bodyData = {
            name,
            details,
            procedureLink,
            shiftId,
            timingType,
            timingValues,
            startTime,
            isDisabled,
            timingOneTimeDate,
        };

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async deleteTask(id) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['deleteTask'];

        const url = `/${configs.path}`;

        const bodyData = {
            id
        }

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async restoreTask(id) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['restoreTask'];

        const url = `/${configs.path}`;

        const bodyData = {
            id,
        };

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },

    async setTaskStatus(id, status) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['setTaskStatus'];

        const url = `/${configs.path}`;

        const bodyData = {
            id,
            status,
        };

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async setTaskComments(id, comments) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['setTaskComments'];

        const url = `/${configs.path}`;

        const bodyData = {
            id,
            comments,
        };

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async resetTasks(shiftId) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['resetTasks'];

        const url = `/${configs.path}`;

        const bodyData = {
            shiftId
        }

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async createOneTask(name, details = "", comments = "", startDate, startTime) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['createOneTimeTask'];

        const url = `/${configs.path}`;

        const bodyData = {
            name,
            details,
            comments,
            startDate,
            startTime,
        };

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
    async updateOneTask(id, name, details = "", comments = "", startDate, startTime) {
        const fetcher = new FetchProvider();

        const tasksConfigs = providersConfigs['taskProvider'];
        const configs = tasksConfigs['updateOneTimeTask'];

        const url = `/${configs.path}`;

        const bodyData = {
            id,
            name,
            details,
            comments,
            startDate,
            startTime,
        };

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        return true;
                    } else {
                        return Promise.reject("error. returnCode " + result.returnCode);
                    }
                }
                else {
                    return Promise.reject("error. result is invalid");
                }
            }).catch((error) => {
                return Promise.reject(error.message);
            })
    },
};
