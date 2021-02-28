import FetchProvider from '../utilities/fetchProvider';
import providersConfigs from '../configs/providersConfigs';
import { Promise } from 'es6-promise';

import TaskLogModel from '../models/TaskLogModel';

export default {

    async getTasksLog(date, shiftId) {
        const fetcher = new FetchProvider();

        const tasksLogConfigs = providersConfigs['tasksLogProvider'];
        const configs = tasksLogConfigs['getTasksLog'];

        const url = configs.path;

        const bodyData = {
            date,
            shiftId
        };

        const request = new Request(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
            cache: 'no-store',
            body: JSON.stringify(bodyData),
        });

        return await fetcher.fetch(request)
            .then(result => {
                if (result) {
                    if (result.returnCode === "00") {
                        try {
                            const tasks = result.data.map(t => new TaskLogModel(
                                t.id,
                                t.taskId,
                                t.name,
                                t.details,
                                t.procedureLink,
                                t.shiftId,
                                t.shiftName,
                                t.shiftFromTime,
                                t.shiftToTime,
                                t.timingType,
                                t.timingValues,
                                t.timingOneTimeDate,
                                t.startTime,
                                t.createDate,
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

};
