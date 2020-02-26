import React from 'react'
import '../styles/App.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from './LandingPage';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';
import PasswordForgetPage from './PasswordForgetPage';
import HomePage from './HomePage';
import AccountPage from './AccountPage';
import AdminPage from './AdminPage';

import * as ROUTES from '../constants/routes';
import { withAuthentication } from '../components/session/index';

const App = () => (
  <Router>
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
  </Router>
);
export default withAuthentication(App);