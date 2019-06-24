import { ADD_FEATURE, GET_FEATURES, DELETE_FEATURE } from '../actions/types';

const initialState = {
	feature: {},
	features: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_FEATURES:
			return {
				...state,
				features: action.payload
			};
		case ADD_FEATURE:
			return {
				...state,
				features: [ action.payload, ...state.features ]
			};
		case DELETE_FEATURE:
			return {
				...state,
				features: state.features.filter((feature) => feature._id !== action.payload)
			};

		default:
			return state;
	}
}
