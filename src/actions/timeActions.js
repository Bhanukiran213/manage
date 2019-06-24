import axios from 'axios';

import { GET_TIME, ADD_TIME, GET_TIMES, UPDATE_TIME, DELETE_TIME, GET_ERRORS } from './types';

export const getTime = (id) => (dispatch) => {
	axios
		.get(`/api/time/${id}`)
		.then((res) =>
			dispatch({
				type: GET_TIME,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_TIME,
				payload: null
			})
		);
};

// Create Profile
export const addTime = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/time', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_TIME,
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

export const getTimings = () => (dispatch) => {
	axios
		.get('/api/time')
		.then((res) =>
			dispatch({
				type: GET_TIMES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_TIMES,
				payload: null
			})
		);
};

export const deleteTime = (id) => (dispatch) => {
	axios
		.delete(`/api/time/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_TIME,
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
export const updateTime = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/time/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_TIME,
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
