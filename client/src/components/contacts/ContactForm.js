import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, current, clearCurrent } = contactContext;

	const [contact, setContact] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal',
	});

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({
				name: '',
				email: '',
				phone: '',
				type: 'personal',
			});
		}
	}, [contactContext, current]); //will run if contactContext has changed, or the value of "current" has changed.

	const { name, email, phone, type } = contact;

	const onChange = (event) => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (current === null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}

		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};
	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>
				{current ? 'Update Contact' : 'Add Contact'}
			</h2>
			<input
				type='text'
				placeholder='name'
				name='name'
				value={name}
				onChange={onChange}
			/>
			<input
				type='email'
				placeholder='email'
				name='email'
				value={email}
				onChange={onChange}
			/>
			<input
				type='text'
				placeholder='phone'
				name='phone'
				value={phone}
				onChange={onChange}
			/>
			<h4>Contact Type</h4>
			<h5>
				<input
					type='radio'
					name='type'
					value='personal'
					checked={type === 'personal'}
					onChange={onChange}
				/>
				Personal {'   '}
				<input
					type='radio'
					name='type'
					value='professional'
					checked={type === 'professional'}
					onChange={onChange}
				/>{' '}
				Professional
			</h5>
			<div>
				<input
					type='submit'
					value={current ? 'Update Contact' : 'Add Contact'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button
						className='btn btn-light btn-block'
						onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
