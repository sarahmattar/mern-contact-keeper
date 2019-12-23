import React, { useReducer } from 'react';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null,
	};
	const [state, dispatch] = useReducer(authReducer, initialState);

	// load user

	const loadUser = async () => {
		//put token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			});
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// register user

	const register = async (formData) => {
		// create a config object for axios to pass along
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/users', formData, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data, //this will be response object, containing the token
			});
			loadUser();
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data.msg, // this will be the error message in json.
			});
		}
	};

	// login user

	const loginUser = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const res = await axios.post('/api/auth', formData, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data, //this will be response object, containing the token
			});
			loadUser();
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.msg, // this will be the error message in json.
			});
		}
	};

	// logout user

	const logoutUser = () => {
		dispatch({ type: LOGOUT });
	};

	// clear errors

	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				loadUser,
				register,
				loginUser,
				logoutUser,
				clearErrors,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
