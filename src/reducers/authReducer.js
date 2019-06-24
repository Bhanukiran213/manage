import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, GET_USERS, ADD_USER, UPDATE_USER, GET_USER } from '../actions/types';

const initialState = {
	isAuthenticated: false,
	user: {},
	users: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case GET_USER:
			return {
				...state,
				user: action.payload
			};

		case GET_USERS:
			return {
				...state,
				users: action.payload
			};
		case ADD_USER:
			return {
				...state,
				users: [ action.payload, ...state.users ]
			};
		case UPDATE_USER:
			return {
				...state,
				//book: action.payload,
				user: [ action.payload, ...state.user ]
			};
		default:
			return state;
	}
}
