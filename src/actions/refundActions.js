import axios from 'axios';

import { GET_REFUND, ADD_REFUND, GET_REFUNDS, UPDATE_REFUND, DELETE_REFUND, GET_ERRORS } from './types';

// export const getRefund = mobile_no => dispatch => {

//     axios
//       .get(`/api/refund/${moble_no}`)
//       .then(res =>
//         dispatch({
//           type: GET_REFUNDS,
//           payload: res.data
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_REFUNDS,
//           payload: null
//         })
//       );
//   };

// // Create Profile
export const addRefund = (facultyData, history) => (dispatch) => {
	axios
		.post('/api/refund', facultyData)
		.then((res) =>
			dispatch({
				type: ADD_REFUND,
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

export const getRefunds = () => (dispatch) => {
	axios
		.get('/api/refund')
		.then((res) =>
			dispatch({
				type: GET_REFUNDS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_REFUNDS,
				payload: null
			})
		);
};

// export const deleteStudio = id => dispatch => {
//     axios
//       .delete(`/api/studio/${id}`)
//       .then(res =>
//         dispatch({
//           type: DELETE_STUDIO,
//           payload: id
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   };
//   export const updateStudio = (id,bookData,history) => dispatch => {
//     axios
//       .put(`/api/studio/${id}`, bookData)
//       .then(res =>
//         dispatch({
//           type: UPDATE_STUDIO,
//           payload: id
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   };
