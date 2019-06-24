import axios from 'axios';

import { GET_ASCOURSES, CLEAR_ERRORS, UPDATE_FACULTY_COURSE, DELETE_ASCOURSE, GET_ERRORS, GET_ASCOURSE } from './types';

export const getAscourses = () => (dispatch) => {
	axios
		.get('/api/ascourse')
		.then((res) =>
			dispatch({
				type: GET_ASCOURSES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ASCOURSES,
				payload: null
			})
		);
};

export const deleteAscourse = (id) => (dispatch) => {
	axios
		.delete(`/api/ascourse/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_ASCOURSE,
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
export const getAscourse = (faculty) => (dispatch) => {
	axios
		.get(`/api/ascourse/${faculty}`)
		.then((res) =>
			dispatch({
				type: GET_ASCOURSE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ASCOURSE,
				payload: null
			})
		);
};

export const updateFacultyCourse = (id, bookData, history) => (dispatch) => {
	dispatch(clearErrors());
	axios.post(`/api/ascourse/${id}`, bookData).then((res) => dispatch(getAscourse(id))).catch((err) =>
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
