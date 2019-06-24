import {
	GET_OFFLINEOFFERS,
	GET_OFFLINEOFFER,
	ADD_OFFLINEOFFER,
	UPDATE_OFFLINEOFFER,
	DELETE_OFFLINEOFFER
} from '../actions/types';

const initialState = {
	offlineoffer: {},
	offlineoffers: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_OFFLINEOFFERS:
			return {
				...state,
				offlineoffers: action.payload
			};
		case GET_OFFLINEOFFER:
			return {
				...state,
				offlineoffer: action.payload
			};
		case ADD_OFFLINEOFFER:
			return {
				...state,
				offlineoffers: [ action.payload, ...state.offlineoffers ]
			};
		case UPDATE_OFFLINEOFFER:
			return {
				...state,
				//book: action.payload,
				offlineoffer: [ action.payload, ...state.offlineoffer ]
			};

		case DELETE_OFFLINEOFFER:
			return {
				...state,
				offlineoffers: state.offlineoffers.filter((studio) => studio._id !== action.payload)
			};

		default:
			return state;
	}
}
