import FetchProvider from '../utilities/fetchProvider';
import providersConfigs from '../configs/providersConfigs';
import { Promise } from 'es6-promise';

export default {
    async setActiveShift(id) {
        const fetcher = new FetchProvider();

        const shiftConfigs = providersConfigs['shiftProvider'];
        const configs = shiftConfigs['setActiveShift'];

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
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject(false);
                    }
                }
                else {
                    return Promise.reject(false);
                }
            }).catch((error) => {
                return Promise.reject(false);
            })
    },
};
