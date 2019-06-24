import axios from 'axios';

import { GET_TOPUP, ADD_TOPUP, GET_TOPUPS, UPDATE_TOPUP, DELETE_TOPUP, GET_ERRORS } from './types';

export const getTopup = (id) => (dispatch) => {
	axios
		.get(`/api/topup/${id}`)
		.then((res) =>
			dispatch({
				type: GET_TOPUP,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_TOPUP,
				payload: null
			})
		);
};

// Create Profile
export const addTopup = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/topup', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_TOPUP,
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

export const getTopups = () => (dispatch) => {
	axios
		.get('/api/topup')
		.then((res) =>
			dispatch({
				type: GET_TOPUPS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_TOPUPS,
				payload: null
			})
		);
};

export const deleteTopup = (id) => (dispatch) => {
	axios
		.delete(`/api/topup/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_TOPUP,
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
export const updateTopup = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/topup/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_TOPUP,
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
export const updateTopupStatus = (id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/topup/${id}/${status}`, bookData)
		.then((res) =>
			// dispatch({
			// 	type: UPDATE_TOPUP,
			// 	payload: id
			// })
			dispatch(getTopups())
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
