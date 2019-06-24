import axios from 'axios';

import { GET_STUDIO, ADD_STUDIO, GET_STUDIOS, UPDATE_STUDIO, DELETE_STUDIO, GET_ERRORS } from './types';

export const getStudio = (id) => (dispatch) => {
	axios
		.get(`/api/studio/${id}`)
		.then((res) =>
			dispatch({
				type: GET_STUDIO,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_STUDIO,
				payload: null
			})
		);
};

// Create Profile
export const addStudio = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/studio', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_STUDIO,
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

export const getStudios = () => (dispatch) => {
	axios
		.get('/api/studio')
		.then((res) =>
			dispatch({
				type: GET_STUDIOS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_STUDIOS,
				payload: null
			})
		);
};

export const deleteStudio = (id) => (dispatch) => {
	axios
		.delete(`/api/studio/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_STUDIO,
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
export const updateStudio = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/studio/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_STUDIO,
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
