import axios from 'axios';

import { GET_COURSE, ADD_COURSE, GET_COURSES, UPDATE_COURSE, DELETE_COURSE, GET_ERRORS } from './types';

export const getCourse = (id) => (dispatch) => {
	axios
		.get(`/api/course/${id}`)
		.then((res) =>
			dispatch({
				type: GET_COURSE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_COURSE,
				payload: null
			})
		);
};

// Create Profile
export const addCourse = (courseData, history) => (dispatch) => {
	axios
		.post('/api/course', courseData)
		.then((res) =>
			dispatch({
				type: ADD_COURSE,
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

export const deletePaper = (id) => (dispatch) => {
	axios
		.delete(`/api/course/papers/${id}`)
		.then((res) =>
			dispatch({
				type: GET_COURSE,
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
// Add experience
export const addPaper = (expData, history) => (dispatch) => {
	axios.post('/api/course/papers', expData).then((res) => history.push(`/dashboard`)).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Add education
export const addChapter = (eduData, history) => (dispatch) => {
	axios.post('/api/course/chapters', eduData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Get all profiles
export const getCourses = () => (dispatch) => {
	axios
		.get('/api/course')
		.then((res) =>
			dispatch({
				type: GET_COURSES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_COURSES,
				payload: null
			})
		);
};

export const deleteCourse = (id) => (dispatch) => {
	axios
		.delete(`/api/course/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_COURSE,
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
export const updateCourse = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/course/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_COURSE,
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

export const getCourseByLevel = (level) => (dispatch) => {
	axios
		.get(`/api/course/level/${level}`)
		.then((res) =>
			dispatch({
				type: GET_COURSES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_COURSES,
				payload: null
			})
		);
};
