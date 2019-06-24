import axios from 'axios';

import {
	GET_DEMOPACKAGE,
	ADD_DEMOPACKAGE,
	GET_DEMOPACKAGES,
	UPDATE_DEMOPACKAGE,
	DELETE_DEMOPACKAGE,
	GET_ERRORS
} from './types';

export const getDemopackage = (id) => (dispatch) => {
	axios
		.get(`/api/demopackage/${id}`)
		.then((res) =>
			dispatch({
				type: GET_DEMOPACKAGE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_DEMOPACKAGE,
				payload: null
			})
		);
};

// Create Profile
export const addDemopackage = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/demopackage', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_DEMOPACKAGE,
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

export const getDemopackages = () => (dispatch) => {
	axios
		.get('/api/demopackage')
		.then((res) =>
			dispatch({
				type: GET_DEMOPACKAGES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_DEMOPACKAGE,
				payload: null
			})
		);
};

export const deleteDemopackage = (id) => (dispatch) => {
	axios
		.delete(`/api/demopackage/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_DEMOPACKAGE,
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
export const updateDemopackage = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/demopackage/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_DEMOPACKAGE,
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
