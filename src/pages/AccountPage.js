import React from 'react';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangeForm from '../components/PasswordChange';
import { withAuthorization, AuthUserContext, withEmailVerification } from '../components/session/index';
import { compose } from 'recompose';
import Layout from '../components/Layout'

import styled from 'styled-components'
import { pxToRem, colors } from '../theme/Helpers'

const AccountWrapper = styled.article`
  padding: ${pxToRem(16)};

  h1 {
    color: ${colors.accent};
  }
`

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Layout page="profil">
        <AccountWrapper>
          <h1>{authUser.username}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
        </AccountWrapper>
      </Layout>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);