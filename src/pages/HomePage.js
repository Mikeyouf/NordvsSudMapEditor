import React from 'react';
import { withAuthorization, withEmailVerification  } from '../components/session/index';
import { compose } from 'recompose';
import Layout from '../components/Layout'

const HomePage = () => (
  <Layout page="carte">
    <h1>Carte</h1>
    <article>

    </article>
  </Layout>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);