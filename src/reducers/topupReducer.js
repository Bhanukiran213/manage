import { GET_TOPUP, ADD_TOPUP, GET_TOPUPS, UPDATE_TOPUP, DELETE_TOPUP } from '../actions/types';

const initialState = {
	topup: {},
	topups: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TOPUP:
			return {
				...state,
				topup: action.payload
			};

		case GET_TOPUPS:
			return {
				...state,
				topups: action.payload
			};
		case ADD_TOPUP:
			return {
				...state,
				topups: [ action.payload, ...state.topups ]
			};
		case DELETE_TOPUP:
			return {
				...state,
				topups: state.topups.filter((feature) => feature._id !== action.payload)
			};
		case UPDATE_TOPUP:
			return {
				...state,
				//book: action.payload,
				topup: [ action.payload, ...state.topup ]
			};
		default:
			return state;
	}
}
