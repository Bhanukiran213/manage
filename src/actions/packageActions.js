import axios from 'axios';

import { GET_PACKAGE, ADD_PACKAGE, GET_PACKAGES, UPDATE_PACKAGE, DELETE_PACKAGE, GET_ERRORS } from './types';

export const getPackage = (id) => (dispatch) => {
	axios
		.get(`/api/package/${id}`)
		.then((res) =>
			dispatch({
				type: GET_PACKAGE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PACKAGE,
				payload: null
			})
		);
};

// Create Profile
export const addPackage = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/package', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_PACKAGE,
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

export const getPackages = () => (dispatch) => {
	axios
		.get('/api/package')
		.then((res) =>
			dispatch({
				type: GET_PACKAGES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PACKAGES,
				payload: null
			})
		);
};

export const deletePackage = (id) => (dispatch) => {
	axios
		.delete(`/api/package/${id}`)
		.then((res) =>
			dispatch({
				type: DELETE_PACKAGE,
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
export const updatePackage = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/package/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_PACKAGE,
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
export const updatePackageStatus = (id, status, bookData, history) => (dispatch) => {
	axios
		.put(`/api/package/${id}/${status}`, bookData)
		.then((res) =>
			// dispatch({
			// 	type: UPDATE_PACKAGE,
			// 	payload: id
			// })
			dispatch(getPackages())
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};
