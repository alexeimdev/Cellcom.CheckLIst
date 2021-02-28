import ActionTypes from '../constants/actionTypes';

export const beginAjaxCall = () => ({ type: ActionTypes.BEGIN_AJAX_CALL });

export const endAjaxCall = () => ({ type: ActionTypes.END_AJAX_CALL });

export const ajaxCallError = (error) => ({ type: ActionTypes.AJAX_CALL_ERROR, error });

export const decreaseAjaxCounter = () => ({ type: ActionTypes.AJAX_CALL_ERROR });
