import React from 'react';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangeForm from '../components/PasswordChange';
import { withAuthorization, AuthUserContext, withEmailVerification } from '../components/session/index';
import { compose } from 'recompose';
import Layout from '../components/Layout'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Layout page="profil">
        <h1>Profil: {authUser.displayName}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </Layout>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);