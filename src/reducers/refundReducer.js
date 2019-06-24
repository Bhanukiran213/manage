import { GET_REFUNDS, GET_REFUND, ADD_REFUND, UPDATE_REFUND, DELETE_REFUND } from '../actions/types';

const initialState = {
	refund: {},
	refunds: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_REFUNDS:
			return {
				...state,
				refunds: action.payload
			};
		case GET_REFUND:
			return {
				...state,
				refund: action.payload
			};
		case ADD_REFUND:
			return {
				...state,
				refunds: [ action.payload, ...state.refunds ]
			};
		case UPDATE_REFUND:
			return {
				...state,
				//book: action.payload,
				refund: [ action.payload, ...state.refund ]
			};

		case DELETE_REFUND:
			return {
				...state,
				refunds: state.refunds.filter((time) => time._id !== action.payload)
			};

		default:
			return state;
	}
}
