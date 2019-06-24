import axios from 'axios';

import {
	GET_FACULTY,
	ADD_FACULTY,
	GET_FACULTYS,
	UPDATE_FACULTY,
	DELETE_FACULTY,
	GET_ERRORS,
	CLEAR_ERRORS
} from './types';

export const getFaculty = (id) => (dispatch) => {
	axios
		.get(`/api/faculty/${id}`)
		.then((res) =>
			dispatch({
				type: GET_FACULTY,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_FACULTY,
				payload: null
			})
		);
};

export const getFacultyid = () => (dispatch) => {
	axios
		.get(`/api/faculty/faculty/test`)
		.then((res) =>
			dispatch({
				type: GET_FACULTY,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_FACULTY,
				payload: null
			})
		);
};
// Create Profile
export const addFaculty = (facultyData, history) => (dispatch) => {
	axios.post('/api/faculty', facultyData).then((res) => history.push('/Faculty')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const getFacultys = () => (dispatch) => {
	axios
		.get('/api/faculty')
		.then((res) =>
			dispatch({
				type: GET_FACULTYS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_FACULTYS,
				payload: null
			})
		);
};

export const deleteFaculty = (id) => (dispatch) => {
	axios
		.delete(`/api/faculty/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_FACULTY,
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
export const updateFaculty = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/faculty/${id}`, bookData)
		.then((res) => {
			dispatch({
				type: UPDATE_FACULTY,
				payload: id
			});
			dispatch(getFacultys());
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err
			})
		);
};

export const updateFacultyStatus = (id, status, bookData, history) => (dispatch) => {
	axios.put(`/api/faculty/${id}/${status}`, bookData).then((res) => dispatch(getFacultys())).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err
		})
	);
};
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
