import { GET_FACULTYS, DELETE_FACULTY, UPDATE_FACULTY, ADD_FACULTY, GET_FACULTY } from '../actions/types';

const initialState = {
	faculty: {},
	facultys: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_FACULTYS:
			return {
				...state,
				facultys: action.payload
			};

		case GET_FACULTY:
			return {
				...state,
				faculty: action.payload
			};

		case ADD_FACULTY:
			return {
				...state,
				facultys: [ action.payload, ...state.facultys ]
			};

		case UPDATE_FACULTY:
			return {
				...state,
				faculty: [ action.payload, ...state.faculty ]
			};

		case DELETE_FACULTY:
			return {
				...state,
				facultys: state.facultys.filter((faculty) => faculty._id !== action.payload)
			};

		default:
			return state;
	}
}
