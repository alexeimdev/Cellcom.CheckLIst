import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

let defaultStore;

export default function configureStore() {
	if (!defaultStore)
		defaultStore = createStore(
			rootReducer,
			{},
			applyMiddleware(thunk)
		);
	return defaultStore;
}