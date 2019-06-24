import {
	GET_OFFLINEUSERS,
	GET_OFFLINEUSER,
	ADD_OFFLINEUSER,
	UPDATE_OFFLINEUSER,
	DELETE_OFFLINEUSER
} from '../actions/types';

const initialState = {
	offlineuser: {},
	offlineusers: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_OFFLINEUSERS:
			return {
				...state,
				offlineusers: action.payload
			};
		case GET_OFFLINEUSER:
			return {
				...state,
				offlineuser: action.payload
			};
		case ADD_OFFLINEUSER:
			return {
				...state,
				offlineusers: [ action.payload, ...state.offlineusers ]
			};
		case UPDATE_OFFLINEUSER:
			return {
				...state,
				//book: action.payload,
				offlineuser: [ action.payload, ...state.offlineuser ]
			};

		case DELETE_OFFLINEUSER:
			return {
				...state,
				offlineusers: state.offlineusers.filter((studio) => studio._id !== action.payload)
			};

		default:
			return state;
	}
}
