import axios from 'axios';

import { GET_PLAYLIST, ADD_PLAYLIST, GET_PLAYLISTS, UPDATE_PLAYLIST, DELETE_PLAYLIST, GET_ERRORS } from './types';

export const getPlaylist = (id) => (dispatch) => {
	axios
		.get(`/api/playlist/${id}`)
		.then((res) =>
			dispatch({
				type: GET_PLAYLIST,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PLAYLIST,
				payload: null
			})
		);
};

// Create Profile
export const addPlaylist = (facultyData, history, id) => (dispatch) => {
	axios
		.post('/api/playlist', facultyData)
		//.then(res =>  dispatch(getPlaylists()))
		.then(
			(res) =>
				dispatch({
					type: ADD_PLAYLIST,
					payload: res.data
				}),
			dispatch(getPlaylists())
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const getPlaylists = () => (dispatch) => {
	axios
		.get('/api/playlist')
		.then((res) =>
			dispatch({
				type: GET_PLAYLISTS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PLAYLISTS,
				payload: null
			})
		);
};

export const deletePlaylist = (id) => (dispatch) => {
	axios
		.delete(`/api/playlist/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_PLAYLIST,
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

export const updatePlaylist = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/playlist/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_PLAYLIST,
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

export const addFeature = (id, courseData, history) => (dispatch) => {
	axios.post(`/api/features/${id}`, courseData).then((res) => dispatch(getPlaylist(id))).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err
		})
	);
};

export const deleteFeature = (id, exp_id) => (dispatch) => {
	axios
		.delete(`/api/features/${id}/${exp_id}`)
		.then((res) =>
			dispatch({
				type: GET_PLAYLIST,
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
