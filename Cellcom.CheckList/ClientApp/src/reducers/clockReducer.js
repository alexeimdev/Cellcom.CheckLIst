import ActionTypes from '../constants/actionTypes';

export default function app(state = {}, action) {
    switch (action.type) {
        case ActionTypes.SET_TIME: {
            return {
                ...state,
                time: action.time,
            }
        }
        default: return state;
    }
}