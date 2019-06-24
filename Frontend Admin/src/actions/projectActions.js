import axios from 'axios';

import { GET_ERRORS, UPDATE_PROJECT, DELETE_PROJECT, GET_PROJECTS, ADD_PROJECT, GET_PROJECT } from './types';

export const getProject = (id) => (dispatch) => {
	axios
		.get(`/api/project/${id}`)
		.then((res) =>
			dispatch({
				type: GET_PROJECT,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROJECT,
				payload: null
			})
		);
};

// Create Profile
export const addProject = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/project', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_PROJECT,
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

export const getProjects = () => (dispatch) => {
	axios
		.get('/api/project')
		.then((res) =>
			dispatch({
				type: GET_PROJECTS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROJECTS,
				payload: null
			})
		);
};

export const deleteProject = (id) => (dispatch) => {
	axios
		.delete(`/api/project/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_PROJECT,
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
export const updateProject = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/project/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_PROJECT,
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
