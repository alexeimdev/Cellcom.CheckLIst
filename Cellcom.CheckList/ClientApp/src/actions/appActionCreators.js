import ActionTypes from '../constants/actionTypes';
import appProvider from '../providers/appProvider';


export function openAppDrawer() {
    return { type: ActionTypes.SET_APP_DRAWER, isOpen: true }
}

export function closeAppDrawer() {
    return { type: ActionTypes.SET_APP_DRAWER, isOpen: false }
}


export function showAppLoader() {
    return { type: ActionTypes.SET_APP_LOADER, show: true }
}

export function hideAppLoader() {
    return { type: ActionTypes.SET_APP_LOADER, show: false }
}

export function showAppSnackbar(message, alertType) {
    return { type: ActionTypes.SET_APP_SNACKBAR, payload: { show: !!message, message, alertType } }
}

export function showAppDialog(title, content) {
    return { type: ActionTypes.SET_APP_DIALOG, payload: { show: !!title, title, content } }
}

export function fetchAppData() {
    return (dispatch) => {
        dispatch({ type: ActionTypes.FETCH_APP_DATA })
        dispatch(showAppLoader());

        return appProvider.getAppData()
            .then(data => {
                if (data) {
                    dispatch(fetchAppDataSuccess(data));
                }
                else {
                    dispatch(fetchAppDataFail("no data"));
                }
            })
            .catch(error => {
                dispatch(fetchAppDataFail(error));
            })
            .finally(x => {
                dispatch(hideAppLoader());
            });
    }
}

function fetchAppDataSuccess(payload) {
    return { type: ActionTypes.FETCH_APP_DATA_SUCCESS, payload }
}

function fetchAppDataFail(error) {
    return { type: ActionTypes.FETCH_APP_DATA_FAIL, error }
}