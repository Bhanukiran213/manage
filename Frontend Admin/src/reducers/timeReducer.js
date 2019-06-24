import { GET_TIMES, GET_TIME, ADD_TIME, UPDATE_TIME, DELETE_TIME } from '../actions/types';

const initialState = {
	time: {},
	times: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TIMES:
			return {
				...state,
				times: action.payload
			};
		case GET_TIME:
			return {
				...state,
				time: action.payload
			};
		case ADD_TIME:
			return {
				...state,
				times: [ action.payload, ...state.times ]
			};
		case UPDATE_TIME:
			return {
				...state,
				//book: action.payload,
				time: [ action.payload, ...state.time ]
			};

		case DELETE_TIME:
			return {
				...state,
				times: state.times.filter((time) => time._id !== action.payload)
			};

		default:
			return state;
	}
}
