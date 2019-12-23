import React from 'react';
import './App.css';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';

import PrivateRoute from './components/routing/PrivateRoute';

//check for an existing token, or an existing logged in user?
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<div className='App'>
							<Navbar
								title='Contact Keeper App'
								icon={faIdCardAlt}
							/>
							<div className='container'>
								<Alerts />
								<Switch>
									<PrivateRoute
										exact
										path='/'
										component={Home}
									/>
									<Route
										exact
										path='/about'
										component={About}
									/>
									<Route
										exact
										path='/register'
										component={Register}
									/>
									<Route
										exact
										path='/login'
										component={Login}
									/>
								</Switch>
							</div>
						</div>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
};

export default App;
