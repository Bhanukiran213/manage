import {
	GET_DEMOPACKAGE,
	ADD_DEMOPACKAGE,
	GET_DEMOPACKAGES,
	UPDATE_DEMOPACKAGE,
	DELETE_DEMOPACKAGE
} from '../actions/types';

const initialState = {
	demopackage: {},
	demopackages: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_DEMOPACKAGE:
			return {
				...state,
				demopackage: action.payload
			};

		case GET_DEMOPACKAGES:
			return {
				...state,
				demopackages: action.payload
			};
		case ADD_DEMOPACKAGE:
			return {
				...state,
				demopackages: [ action.payload, ...state.demopackages ]
			};
		case DELETE_DEMOPACKAGE:
			return {
				...state,
				demopackages: state.demopackages.filter((demopackage) => demopackage._id !== action.payload)
			};
		case UPDATE_DEMOPACKAGE:
			return {
				...state,
				//book: action.payload,
				demopackage: [ action.payload, ...state.demopackage ]
			};
		default:
			return state;
	}
}
