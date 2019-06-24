import { GET_CREDIT, ADD_CREDIT, GET_CREDITS, UPDATE_CREDIT, DELETE_CREDIT } from '../actions/types';

const initialState = {
	credit: {},
	credits: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CREDIT:
			return {
				...state,
				credit: action.payload
			};

		case GET_CREDITS:
			return {
				...state,
				credits: action.payload
			};
		case ADD_CREDIT:
			return {
				...state,
				credits: [ action.payload, ...state.credits ]
			};
		case DELETE_CREDIT:
			return {
				...state,
				credits: state.credits.filter((feature) => feature._id !== action.payload)
			};
		case UPDATE_CREDIT:
			return {
				...state,
				//book: action.payload,
				credit: [ action.payload, ...state.credit ]
			};
		default:
			return state;
	}
}
