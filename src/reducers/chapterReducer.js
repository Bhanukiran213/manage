import { GET_CHAPTER, ADD_CHAPTER, GET_CHAPTERS, UPDATE_CHAPTER, DELETE_CHAPTER } from '../actions/types';

const initialState = {
	chapter: {},
	chapters: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_CHAPTER:
			return {
				...state,
				chapter: action.payload
			};

		case GET_CHAPTERS:
			return {
				...state,
				chapters: action.payload
			};
		case ADD_CHAPTER:
			return {
				...state,
				chapters: [ action.payload, ...state.chapters ]
			};
		case DELETE_CHAPTER:
			return {
				...state,
				chapters: state.chapters.filter((feature) => feature._id !== action.payload)
			};
		case UPDATE_CHAPTER:
			return {
				...state,
				//book: action.payload,
				chapter: [ action.payload, ...state.chapter ]
			};
		default:
			return state;
	}
}
