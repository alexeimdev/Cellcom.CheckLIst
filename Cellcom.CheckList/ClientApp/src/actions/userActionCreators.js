import ActionTypes from '../constants/actionTypes';

export function setUserName(payload) {
    return { type: ActionTypes.SET_USER_NAME, payload }
}