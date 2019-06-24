import axios from 'axios';

import { GET_CREDIT, ADD_CREDIT, GET_CREDITS, UPDATE_CREDIT, CLEAR_ERRORS, DELETE_CREDIT, GET_ERRORS } from './types';

export const getCredit = (id) => (dispatch) => {
	axios
		.get(`/api/credit/${id}`)
		.then((res) =>
			dispatch({
				type: GET_CREDIT,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_CREDIT,
				payload: null
			})
		);
};

// Create Profile
export const addCredit = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/credit', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_CREDIT,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const getCredits = () => (dispatch) => {
	axios
		.get('/api/credit')
		.then((res) =>
			dispatch({
				type: GET_CREDITS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_CREDITS,
				payload: null
			})
		);
};

export const deleteCredit = (id) => (dispatch) => {
	axios
		.delete(`/api/credit/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_CREDIT,
				payload: id
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const updateCredit = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/credit/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_CREDIT,
				payload: id
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const updateCreditStatus = (id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/credit/${id}/${status}`, bookData)
		.then((res) =>
			// dispatch({
			// 	type: UPDATE_CREDIT,
			// 	payload: id
			// }),
			dispatch(getCredits())
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
