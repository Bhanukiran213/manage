import { ADD_LECTURECOURSE, GET_LECTURESCOURSE, UPDATE_LECTURECOURSE, DELETE_LECTURECOURSE } from '../actions/types';

const initialState = {
	lecturecourse: {},
	lecturecourses: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_LECTURESCOURSE:
			return {
				...state,
				lecturecourses: action.payload
			};

		case ADD_LECTURECOURSE:
			return {
				...state,
				lecturecourses: [ action.payload, ...state.lecturecourses ]
			};
		case DELETE_LECTURECOURSE:
			return {
				...state,
				lecturecourses: state.lecturecourses.filter((lecture) => lecture._id !== action.payload)
			};
		case UPDATE_LECTURECOURSE:
			return {
				...state,
				//book: action.payload,
				lecturecourse: [ action.payload, ...state.lecturecourse ]
			};
		default:
			return state;
	}
}
