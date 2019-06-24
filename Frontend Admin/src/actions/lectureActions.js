import axios from 'axios';

import { GET_LECTURE, ADD_LECTURE, GET_LECTURES, UPDATE_LECTURE, DELETE_LECTURE, GET_ERRORS } from './types';

export const getLecture = (id) => (dispatch) => {
	axios
		.get(`/api/lecture/${id}`)
		.then((res) =>
			dispatch({
				type: GET_LECTURE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_LECTURE,
				payload: null
			})
		);
};

// Create Profile
export const addLecture = (courseData, history) => (dispatch) => {
	axios
		.post(`/api/lecture`, courseData)
		.then((res) =>
			dispatch({
				type: ADD_LECTURE,
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
export const getLectures = () => (dispatch) => {
	axios
		.get('/api/lecture')
		.then((res) =>
			dispatch({
				type: GET_LECTURES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_LECTURES,
				payload: null
			})
		);
};

export const deleteLecture = (id) => (dispatch) => {
	axios
		.delete(`/api/lecture/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_LECTURE,
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
export const updateLecture = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/lecture/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_LECTURE,
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

export const deleteLectureCourse = (id, exp_id) => (dispatch) => {
	axios
		.delete(`/api/lecture/${id}/${exp_id}`)
		.then((res) =>
			dispatch({
				type: GET_LECTURE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		);
};
export const updateLectureCourse = (id, exp_id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/lecture/${id}/${exp_id}/${status}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_LECTURE,
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
