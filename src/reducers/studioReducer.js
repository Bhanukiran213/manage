import { GET_STUDIOS, GET_STUDIO, ADD_STUDIO, UPDATE_STUDIO, DELETE_STUDIO } from '../actions/types';

const initialState = {
	studio: {},
	studios: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_STUDIOS:
			return {
				...state,
				studios: action.payload
			};
		case GET_STUDIO:
			return {
				...state,
				studio: action.payload
			};
		case ADD_STUDIO:
			return {
				...state,
				studios: [ action.payload, ...state.studios ]
			};
		case UPDATE_STUDIO:
			return {
				...state,
				//book: action.payload,
				studio: [ action.payload, ...state.studio ]
			};

		case DELETE_STUDIO:
			return {
				...state,
				studios: state.times.filter((studio) => studio._id !== action.payload)
			};

		default:
			return state;
	}
}
