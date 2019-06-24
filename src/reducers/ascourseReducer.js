import { DELETE_ASCOURSE, UPDATE_FACULTY_COURSE, GET_ASCOURSE, GET_ASCOURSES } from '../actions/types';

const initialState = {
	ascourse: {},
	ascourses: [],
	ascourses1: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ASCOURSE:
			return {
				...state,
				ascourses1: action.payload
			};

		case GET_ASCOURSES:
			return {
				...state,
				ascourses1: action.payload
			};
		case UPDATE_FACULTY_COURSE:
			return {
				...state,
				ascourses1: [ action.payload, ...state.ascourses1 ]
			};
		case DELETE_ASCOURSE:
			return {
				...state,
				ascourses1: state.ascourses1.filter((ascourse) => ascourse._id !== action.payload)
			};

		default:
			return state;
	}
}
