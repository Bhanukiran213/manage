import {
	GET_COURSELEVEL,
	ADD_COURSELEVEL,
	GET_COURSELEVELS,
	UPDATE_COURSELEVEL,
	DELETE_COURSELEVEL
} from '../actions/types';

const initialState = {
	courselevel: {},
	courselevels: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_COURSELEVELS:
			return {
				...state,
				courselevels: action.payload
			};
		case GET_COURSELEVEL:
			return {
				...state,
				courselevel: action.payload
			};
		case ADD_COURSELEVEL:
			return {
				...state,
				courselevels: [ action.payload, ...state.courselevels ]
			};
		case UPDATE_COURSELEVEL:
			return {
				...state,
				//book: action.payload,
				courselevel: [ action.payload, ...state.courselevel ]
			};

		case DELETE_COURSELEVEL:
			return {
				...state,
				courselevels: state.courselevels.filter((maincourse) => maincourse._id !== action.payload)
			};

		default:
			return state;
	}
}
