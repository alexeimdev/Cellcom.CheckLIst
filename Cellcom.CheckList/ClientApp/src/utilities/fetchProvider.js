import 'isomorphic-fetch';

export default class Fetcher {
    
    async fetch(request) {
        try {
            return await fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    else {
                        return Promise.reject(`response status is ${response.status}`);
                    }
                })
                .then(function (json) {
                    return json;
                })
                .catch(e => {
                    return Promise.reject(e);
                });
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
}