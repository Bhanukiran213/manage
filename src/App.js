/**********************************************************************************
 * ********************************************************************************
                                      WARNING 
                               ~~~~~~~~~~~~~~~~~~~~~~~~
                      DO NOT MODIFIED WITHOUT ANY PERMISSSION 
          IF ANY CHANGING INTO THE FILE MAY BE PRODUCT DO NOT WORKING PROPERLY
      THIS PRODUCT POWER BY NULURN PVT LTD , ALL RIGHTS ARE RESERVED 2017 -2019  
************************************************************************************
************************************************************************************
 */

import React, { Component } from 'react';

import './App.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Login from './Component/auth/Login';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);

	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		//store.dispatch(clearCurrentProfile());
		// Redirect to login
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Dashboard />

						<Route exact path="/login" component={Login} />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
