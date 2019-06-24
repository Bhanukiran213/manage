import { GET_PROJECTS, GET_PROJECT, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from '../actions/types';

const initialState = {
	project: {},
	projects: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PROJECTS:
			return {
				...state,
				projects: action.payload
			};
		case GET_PROJECT:
			return {
				...state,
				project: action.payload
			};
		case ADD_PROJECT:
			return {
				...state,
				projects: [ action.payload, ...state.projects ]
			};
		case UPDATE_PROJECT:
			return {
				...state,
				//book: action.payload,
				project: [ action.payload, ...state.project ]
			};

		case DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter((studio) => studio._id !== action.payload)
			};

		default:
			return state;
	}
}
