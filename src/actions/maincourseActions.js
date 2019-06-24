import axios from 'axios';

import {
	GET_MAINCOURSE,
	ADD_MAINCOURSE,
	GET_MAINCOURSES,
	UPDATE_MAINCOURSE,
	DELETE_MAINCOURSE,
	GET_ERRORS
} from './types';

export const getMaincourse = (id) => (dispatch) => {
	axios
		.get(`/api/maincourse/${id}`)
		.then((res) =>
			dispatch({
				type: GET_MAINCOURSE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_MAINCOURSE,
				payload: null
			})
		);
};

// Create Profile
export const addMaincourse = (courseData, history) => (dispatch) => {
	axios
		.post(`/api/maincourse`, courseData)
		.then((res) =>
			dispatch({
				type: ADD_MAINCOURSE,
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

// Get all profiles
export const getMaincourses = () => (dispatch) => {
	axios
		.get('/api/maincourse')
		.then((res) =>
			dispatch({
				type: GET_MAINCOURSES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_MAINCOURSES,
				payload: null
			})
		);
};

export const deleteMaincourse = (id) => (dispatch) => {
	axios
		.delete(`/api/maincourse/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_MAINCOURSE,
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
export const updateMaincourse = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/maincourse/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_MAINCOURSE,
				payload: id
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		);
};
