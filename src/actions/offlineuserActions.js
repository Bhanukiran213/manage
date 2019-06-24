import axios from 'axios';

import {
	GET_ERRORS,
	UPDATE_OFFLINEUSER,
	DELETE_OFFLINEUSER,
	GET_OFFLINEUSERS,
	ADD_OFFLINEUSER,
	GET_OFFLINEUSER
} from './types';

export const getOfflineuser = (id) => (dispatch) => {
	axios
		.get(`/api/offlineuser/${id}`)
		.then((res) =>
			dispatch({
				type: GET_OFFLINEUSER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_OFFLINEUSER,
				payload: null
			})
		);
};
export const lastOfflineuser = () => (dispatch) => {
	axios
		.get(`/api/offlineuser/last/offlineuser`)
		.then((res) =>
			dispatch({
				type: GET_OFFLINEUSER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_OFFLINEUSER,
				payload: null
			})
		);
};

// Create Profile
export const addOfflineuser = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/offlineuser', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_OFFLINEUSER,
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
export const updateOfflineuserStatus = (id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/offlineuser/${id}/${status}`, bookData)
		.then((res) =>
			// dispatch({
			// 	type: UPDATE_OFFLINEUSER,
			// 	payload: id
			// })
			dispatch(getOfflineusers())
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const getOfflineusers = () => (dispatch) => {
	axios
		.get('/api/offlineuser')
		.then((res) =>
			dispatch({
				type: GET_OFFLINEUSERS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_OFFLINEUSERS,
				payload: null
			})
		);
};

export const deleteOfflineuser = (id) => (dispatch) => {
	axios
		.delete(`/api/offlineuser/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_OFFLINEUSER,
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
export const updateOfflineuser = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/offlineuser/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_OFFLINEUSER,
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
