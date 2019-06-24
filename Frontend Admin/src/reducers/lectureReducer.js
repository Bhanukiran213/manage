import { GET_LECTURE, ADD_LECTURE, GET_LECTURES, UPDATE_LECTURE, DELETE_LECTURE } from '../actions/types';

const initialState = {
	lecture: {},
	lectures: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_LECTURES:
			return {
				...state,
				lectures: action.payload
			};
		case GET_LECTURE:
			return {
				...state,
				lecture: action.payload
			};
		case ADD_LECTURE:
			return {
				...state,
				lectures: [ action.payload, ...state.lectures ]
			};
		case UPDATE_LECTURE:
			return {
				...state,
				//book: action.payload,
				lecture: [ action.payload, ...state.lecture ]
			};

		case DELETE_LECTURE:
			return {
				...state,
				lectures: state.lectures.filter((lecture) => lecture._id !== action.payload)
			};

		default:
			return state;
	}
}
