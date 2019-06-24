import axios from 'axios';

import {
	GET_COURSELEVEL,
	ADD_COURSELEVEL,
	GET_COURSELEVELS,
	UPDATE_COURSELEVEL,
	DELETE_COURSELEVEL,
	GET_ERRORS
} from './types';

export const getCourselevel1 = (id) => (dispatch) => {
	axios
		.get(`/api/courselevel/id/${id}`)
		.then((res) =>
			dispatch({
				type: GET_COURSELEVEL,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_COURSELEVEL,
				payload: null
			})
		);
};

export const getCourselevel = (project) => (dispatch) => {
	axios
		.get(`/api/courselevel/${project}`)
		.then((res) =>
			dispatch({
				type: GET_COURSELEVELS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_COURSELEVELS,
				payload: null
			})
		);
};

// Create Profile
export const addCourselevel = (id, courseData, history) => (dispatch) => {
	axios
		.post(`/api/courselevel/${id}`, courseData)
		.then((res) =>
			dispatch({
				type: ADD_COURSELEVEL,
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

export const addlevel = (id, courseData, history) => (dispatch) => {
	axios.post(`/api/courselevel/level/${id}`, courseData).then((res) => history.push(`/addlevel/${id}`)).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const getCourselevels1 = () => (dispatch) => {
	axios
		.get('/api/courselevel/course')
		.then((res) =>
			dispatch({
				type: GET_COURSELEVELS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: null
			})
		);
};

// Get all profiles
export const getCourselevels = () => (dispatch) => {
	axios
		.get('/api/courselevel')
		.then((res) =>
			dispatch({
				type: GET_COURSELEVELS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_COURSELEVELS,
				payload: null
			})
		);
};

export const deleteCourselevel = (id) => (dispatch) => {
	axios
		.delete(`/api/courselevel/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_COURSELEVEL,
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

export const deleteLevel = (id, exp_id) => (dispatch) => {
	axios
		.delete(`/api/courselevel/level/${id}/${exp_id}`)
		.then((res) =>
			dispatch({
				type: GET_COURSELEVEL,
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
export const updateCourselevel = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/courselevel/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_COURSELEVEL,
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
