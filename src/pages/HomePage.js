import React from 'react';
import { withAuthorization, withEmailVerification  } from '../components/session/index';
import { compose } from 'recompose';
import Layout from '../components/Layout'

const HomePage = () => (
  <Layout page="carte">
    <h1>Page d'accueil</h1>
    <p>Cette page est accessible pour chaque utilisateur connecté</p>
  </Layout>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);