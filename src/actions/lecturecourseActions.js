import axios from 'axios';
import { getLecture } from './lectureActions';
import { ADD_LECTURECOURSE, GET_LECTURESCOURSE, GET_ERRORS, DELETE_LECTURECOURSE, UPDATE_LECTURECOURSE } from './types';

// Create Profile
export const addLecturecourse = (id, courseData, history) => (dispatch) => {
	axios.post(`/api/lecture/${id}`, courseData).then((res) => dispatch(getLecture(id))).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err
		})
	);
};

// Get all profiles
export const getLecturecourse = (lecture) => (dispatch) => {
	axios
		.get(`/api/lecture/courses/${lecture}`)
		.then((res) =>
			dispatch({
				type: GET_LECTURESCOURSE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_LECTURESCOURSE,
				payload: null
			})
		);
};

export const deleteLecturecourse = (id) => (dispatch) => {
	axios
		.delete(`/api/lecture/lecturecourse/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_LECTURECOURSE,
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
export const updateLecturecourse = (status, faculty, lecture, course, chapters, bookData, history) => (dispatch) => {
	axios
		.put(`/api/lecture/${status}/${faculty}/${lecture}/${course}/${chapters}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_LECTURECOURSE,
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
