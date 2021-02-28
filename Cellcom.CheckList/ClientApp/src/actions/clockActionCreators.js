import ActionTypes from '../constants/actionTypes';

export function setTime(time) {
    return { type: ActionTypes.SET_TIME, time }
}