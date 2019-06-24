import axios from 'axios';

import { GET_CHAPTER, ADD_CHAPTER, GET_CHAPTERS, UPDATE_CHAPTER, DELETE_CHAPTER, GET_ERRORS } from './types';

export const getChapter = (courselevel) => (dispatch) => {
	axios
		.get(`/api/chapter/${courselevel}`)
		.then((res) =>
			dispatch({
				type: GET_CHAPTERS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_CHAPTERS,
				payload: null
			})
		);
};
export const getChapterbyid = (id) => (dispatch) => {
	axios
		.get(`/api/chapter/c/${id}`)
		.then((res) =>
			dispatch({
				type: GET_CHAPTER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_CHAPTER,
				payload: null
			})
		);
};

// Create Profile
export const addChapter = (id, courselevel, courseData, history) => (dispatch) => {
	axios
		.post(`/api/chapter/id/${id}/${courselevel}`, courseData)
		.then((res) =>
			dispatch({
				type: ADD_CHAPTER,
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

export const addChapter1 = (courselevel, id, courseData, history) => (dispatch) => {
	axios
		.post(`/api/chapter/${courselevel}/${id}`, courseData)
		.then((res) =>
			dispatch({
				type: ADD_CHAPTER,
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

/////getting paper by id
export const getChapterbyid1 = (courselevel, id) => (dispatch) => {
	axios
		.get(`/api/chapter/${courselevel}/${id}`)
		.then((res) =>
			dispatch({
				type: GET_CHAPTER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_CHAPTER,
				payload: null
			})
		);
};

export const updateStatus = (courselevel, id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/chapter/${courselevel}/${id}/${status}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_CHAPTER,
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

// Get all profiles
export const getChapters = () => (dispatch) => {
	axios
		.get('/api/chapter')
		.then((res) =>
			dispatch({
				type: GET_CHAPTERS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_CHAPTERS,
				payload: null
			})
		);
};

export const deleteChapter = (courselevel, id, exp_id) => (dispatch) => {
	axios
		.delete(`/api/chapter/${courselevel}/${id}/${exp_id}`)
		.then((res) =>
			dispatch({
				type: GET_CHAPTER,
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
export const updateChapterStatus = (courselevel, id, exp_id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/chapter/${courselevel}/${id}/${exp_id}/${status}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_CHAPTER,
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

export const updateChapter = (courselevel, id, exp_id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/chapter/${courselevel}/${id}/${exp_id}/p/section`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_CHAPTER,
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

export const getChapterbyexpid = (courselevel, id, exp_id) => (dispatch) => {
	axios
		.get(`/api/chapter/${courselevel}/${id}/${exp_id}`)
		.then((res) =>
			dispatch({
				type: GET_CHAPTER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_CHAPTER,
				payload: null
			})
		);
};
