import ActionTypes from '../constants/actionTypes';
import fetchStatus from '../constants/fetchStatus';

const initialState = {
    snackbar: {
        show: false,
        message: '',
    },
    dialog: {
        show: false,
        title: '',
        content: '',
    },
}

export default function app(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_APP_LOADER: {
            return {
                ...state,
                showLoader: action.show,
            }
        }
        case ActionTypes.SET_APP_DRAWER: {
            return {
                ...state,
                openAppDrawer: action.isOpen,
            }
        }
        case ActionTypes.SET_APP_SNACKBAR: {
            if (action.payload.message) {
                return {
                    ...state,
                    snackbar: {
                        ...state.snackbar,
                        show: true,
                        message: action.payload.message,
                        alertType: action.payload.alertType,
                    }
                }
            }
            else {
                return {
                    ...state,
                    snackbar: {
                        ...state.snackbar,
                        show: false,
                    }
                }
            }
        }
        case ActionTypes.SET_APP_DIALOG: {
            if (action.payload.title) {
                return {
                    ...state,
                    dialog: {
                        ...state.dialog,
                        show: true,
                        title: action.payload.title,
                        content: action.payload.content,
                    }
                }
            }
            else {
                return {
                    ...state,
                    dialog: {
                        ...state.dialog,
                        show: false,
                    }
                }
            }
        }
        case ActionTypes.FETCH_APP_DATA: {
            return {
                ...state,
                fetchAppDataStatus: fetchStatus.PENDING,
                appDataError: null,
            }
        }
        case ActionTypes.FETCH_APP_DATA_SUCCESS: {
            return {
                ...state,
                fetchAppDataStatus: fetchStatus.SUCCESS,
                appData: action.payload,
                appDataError: null,
            }
        }
        case ActionTypes.FETCH_APP_DATA_FAIL: {
            return {
                ...state,
                fetchAppDataStatus: fetchStatus.FAILED,
                appData: null,
                appDataError: action.error,
            }
        }
        default: return state;
    }
}