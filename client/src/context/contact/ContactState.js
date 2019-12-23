import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	GET_CONTACTS,
	CLEAR_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	CONTACT_ERROR,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	//get contacts

	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//clear contacts

	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	//add contact

	const addContact = async (contact) => {
		const config = {
			'Content-Type': 'application/json',
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//delete contact

	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//set current contact

	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	//clear current contact

	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//update contact

	const updateContact = async (contact) => {
		const config = {
			'Content-Type': 'application/json',
		};

		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	//filter contacts

	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	//clear filter

	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				getContacts,
				addContact,
				deleteContact,
				updateContact,
				setCurrent,
				clearCurrent,
				filterContacts,
				clearFilter,
				clearContacts,
			}}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
