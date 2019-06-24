import axios from 'axios';

import {
	GET_FEATURE,
	ADD_FEATURE,
	GET_FEATURES,
	UPDATE_FEATURE,
	DELETE_FEATURE,
	GET_PLAYLIST,
	ADD_PLAYLIST,
	GET_PLAYLISTS,
	UPDATE_PLAYLIST,
	DELETE_PLAYLIST,
	GET_ERRORS
} from './types';

export const getFeature = (playlist) => (dispatch) => {
	axios
		.get(`/api/features/${playlist}`)
		.then((res) =>
			dispatch({
				type: GET_FEATURES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_FEATURES,
				payload: null
			})
		);
};

// Create Profile
export const addFeature = (id, courseData, history) => (dispatch) => {
	axios.post(`/api/features/${id}`, courseData).then.then((res) => history.push(`/editplaylist/${id}`)).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Get all profiles
export const getFeatures = () => (dispatch) => {
	axios
		.get('/api/features')
		.then((res) =>
			dispatch({
				type: GET_FEATURES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_FEATURES,
				payload: null
			})
		);
};

export const deleteFeature = (id, exp_id) => (dispatch) => {
	axios
		.delete(`/api/features/${id}/${exp_id}`)
		.then((res) =>
			dispatch({
				type: DELETE_FEATURE,
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
export const updateFeature = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/feature/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_FEATURE,
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
