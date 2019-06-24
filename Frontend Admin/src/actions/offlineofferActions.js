import axios from 'axios';

import {
	GET_ERRORS,
	UPDATE_OFFLINEOFFER,
	DELETE_OFFLINEOFFER,
	GET_OFFLINEOFFERS,
	ADD_OFFLINEOFFER,
	GET_OFFLINEOFFER
} from './types';

export const getOfflineoffer = (id) => (dispatch) => {
	axios
		.get(`/api/offlineoffer/${id}`)
		.then((res) =>
			dispatch({
				type: GET_OFFLINEOFFER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_OFFLINEOFFER,
				payload: null
			})
		);
};
export const lastOfflineoffer = (id) => (dispatch) => {
	axios
		.get(`/api/offlineoffer/last/offlineoffer/${id}`)
		.then((res) =>
			dispatch({
				type: GET_OFFLINEOFFER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_OFFLINEOFFER,
				payload: null
			})
		);
};

// Create Profile
export const addOfflineoffer = (id, facultyData, history) => (dispatch) => {
	axios
		.post(`/api/offlineoffer/${id}`, facultyData)
		.then((res) =>
			dispatch({
				type: ADD_OFFLINEOFFER,
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
export const updateOfflineofferStatus = (id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/offlineoffer/${id}/${status}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_OFFLINEOFFER,
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

export const getOfflineoffers = (id) => (dispatch) => {
	axios
		.get(`/api/offlineoffer/${id}`)
		.then((res) =>
			dispatch({
				type: GET_OFFLINEOFFERS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_OFFLINEOFFERS,
				payload: null
			})
		);
};

export const deleteOfflineoffer = (id) => (dispatch) => {
	axios
		.delete(`/api/offlinoffer/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_OFFLINEOFFER,
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
export const updateOfflineoffer = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/offlineoffer/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_OFFLINEOFFER,
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
