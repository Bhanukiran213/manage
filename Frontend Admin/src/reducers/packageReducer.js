import { GET_PACKAGE, ADD_PACKAGE, GET_PACKAGES, UPDATE_PACKAGE, DELETE_PACKAGE } from '../actions/types';

const initialState = {
	package: {},
	packages: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PACKAGE:
			return {
				...state,
				package: action.payload
			};

		case GET_PACKAGES:
			return {
				...state,
				packages: action.payload
			};
		case ADD_PACKAGE:
			return {
				...state,
				packages: [ action.payload, ...state.packages ]
			};
		case DELETE_PACKAGE:
			return {
				...state,
				packages: state.packages.filter((feature) => feature._id !== action.payload)
			};
		case UPDATE_PACKAGE:
			return {
				...state,
				//book: action.payload,
				package: [ action.payload, ...state.package ]
			};
		default:
			return state;
	}
}
