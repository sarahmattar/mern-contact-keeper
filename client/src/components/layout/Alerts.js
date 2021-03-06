import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Alerts = ({ icon }) => {
	const alertContext = useContext(AlertContext);
	return (
		alertContext.alerts.length > 0 &&
		alertContext.alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				<FontAwesomeIcon icon={icon} /> {alert.msg}
			</div>
		))
	);
};

Alerts.propTypes = {
	icon: PropTypes.object.isRequired,
};

Alerts.defaultProps = {
	icon: faInfoCircle,
};

export default Alerts;
