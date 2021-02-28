import FetchProvider from '../utilities/fetchProvider';
import providersConfigs from '../configs/providersConfigs';
import { Promise } from 'es6-promise';

import AppDataModel from '../models/AppDataModel';

export default {
    async getAppData() {

        const fetcher = new FetchProvider();

        const appDataConfigs = providersConfigs['appProvider'];
        const configs = appDataConfigs['getAppData'];

        const url = `/${configs.path}`;

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
                            const appData = result.data;
                            return Promise.resolve(new AppDataModel(
                                appData.externalLinks,
                                appData.shifts,
                                appData.isAdmin,
                            ));
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
