import {
	GET_MAINCOURSE,
	ADD_MAINCOURSE,
	GET_MAINCOURSES,
	UPDATE_MAINCOURSE,
	DELETE_MAINCOURSE
} from '../actions/types';

const initialState = {
	maincourse: {},
	maincourses: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MAINCOURSES:
			return {
				...state,
				maincourses: action.payload
			};
		case GET_MAINCOURSE:
			return {
				...state,
				maincourse: action.payload
			};
		case ADD_MAINCOURSE:
			return {
				...state,
				maincourses: [ action.payload, ...state.maincourses ]
			};
		case UPDATE_MAINCOURSE:
			return {
				...state,
				//book: action.payload,
				maincourse: [ action.payload, ...state.maincourse ]
			};

		case DELETE_MAINCOURSE:
			return {
				...state,
				maincourses: state.maincourses.filter((maincourse) => maincourse._id !== action.payload)
			};

		default:
			return state;
	}
}
