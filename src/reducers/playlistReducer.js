import { DELETE_PLAYLIST, UPDATE_PLAYLIST, ADD_PLAYLIST, GET_PLAYLIST, GET_PLAYLISTS } from '../actions/types';

const initialState = {
	playlist: {},
	playlists: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PLAYLISTS:
			return {
				...state,
				playlists: action.payload
			};
		case GET_PLAYLIST:
			return {
				...state,
				playlist: action.payload
			};
		case ADD_PLAYLIST:
			return {
				...state,
				playlists: [ action.payload, ...state.playlists ]
			};
		case UPDATE_PLAYLIST:
			return {
				...state,
				//book: action.payload,
				playlist: [ action.payload, ...state.playlist ]
			};

		case DELETE_PLAYLIST:
			return {
				...state,
				playlists: state.playlists.filter((playlist) => playlist._id !== action.payload)
			};

		default:
			return state;
	}
}
