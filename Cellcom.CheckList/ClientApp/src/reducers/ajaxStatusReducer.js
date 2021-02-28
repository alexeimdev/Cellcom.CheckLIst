import ActionTypes from '../constants/actionTypes';

const actionTypeEndsInSuccess = (type) => {
	return type.substring(type.length - 8) === '_SUCCESS';
};
 
export default function ajaxStatusReducer(state = {counter: 0}, action) {

	if (action.type === ActionTypes.BEGIN_AJAX_CALL) {
		return { ...state, counter: state.counter + 1};
	}
	else if (action.type === ActionTypes.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type) || action.type === ActionTypes.END_AJAX_CALL) {
		let counter = 0;
		if (state.counter > 0)
			counter = state.counter - 1;

		return { ...state, counter: counter };
	}
	
	return state;
}
