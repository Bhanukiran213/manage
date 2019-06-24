import { GET_COURSES, DELETE_COURSE, GET_COURSE, ADD_COURSE, UPDATE_COURSE } from '../actions/types';

const initialState = {
	course: {},
	courses: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_COURSES:
			return {
				...state,
				courses: action.payload
			};
		case GET_COURSE:
			return {
				...state,
				course: action.payload
			};
		case ADD_COURSE:
			return {
				...state,
				courses: [ action.payload, ...state.courses ]
			};
		case UPDATE_COURSE:
			return {
				...state,
				//book: action.payload,
				course: [ action.payload, ...state.course ]
			};

		case DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((course) => course._id !== action.payload)
			};

		default:
			return state;
	}
}
