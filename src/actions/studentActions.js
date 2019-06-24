import axios from 'axios';

import { GET_STUDENTS } from './types';

export const getStudents = () => (dispatch) => {
	axios
		.get('/api/student')
		.then((res) =>
			dispatch({
				type: GET_STUDENTS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_STUDENTS,
				payload: null
			})
		);
};

export const getStudentCredits = (mobile_number) => (dispatch) => {
	axios
		.get(`/api/refund/${mobile_number}`)
		.then((res) =>
			dispatch({
				type: GET_STUDENTS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_STUDENTS,
				payload: null
			})
		);
};
