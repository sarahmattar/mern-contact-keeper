import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ icon, title }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logoutUser, user } = authContext;
	const { clearContacts } = contactContext;

	const onLogout = () => {
		logoutUser();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			Hello, {user && user.name}.
			<li>
				<a onClick={onLogout} href='#!'>
					<FontAwesomeIcon icon={faSignOutAlt} />
					<span className='hide-sm'></span> Logout
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar bg-primary'>
			<h1>
				<FontAwesomeIcon icon={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
};

export default Navbar;
