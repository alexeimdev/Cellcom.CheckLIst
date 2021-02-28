import ActionTypes from '../constants/actionTypes';

const initialState = {}

export default function user(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_USER_NAME: {
            return {
                ...state,
                userName: action.payload,
            }
        }
        default: return state;
    }
}