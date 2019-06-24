import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, GET_USERS, ADD_USER, GET_USER, UPDATE_USER } from './types';

export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/api/admin/register', userData)
		.then((res) =>
			dispatch({
				type: ADD_USER,
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
// Get all profiles
export const getUsers = () => (dispatch) => {
	axios
		.get('/api/admin/')
		.then((res) =>
			dispatch({
				type: GET_USERS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_USERS,
				payload: null
			})
		);
};

// Get all profiles
export const getUser = (id) => (dispatch) => {
	axios
		.get(`/api/admin/${id}`)
		.then((res) =>
			dispatch({
				type: GET_USER,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_USER,
				payload: null
			})
		);
};
// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/admin/login', userData)
		.then((res) => {
			// Save to localStorage
			const { token } = res.data;
			// Set token to ls
			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from localStorage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));

	window.location.href = '/login';
};
export const updateUser = (id, bookData, history) => (dispatch) => {
	axios
		.put(`/api/admin/${id}`, bookData)
		.then((res) =>
			dispatch({
				type: UPDATE_USER,
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
