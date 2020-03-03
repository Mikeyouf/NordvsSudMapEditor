import React from 'react';
import { withAuthorization, withEmailVerification  } from '../components/session/index';
import { compose } from 'recompose';
import Layout from '../components/Layout'
import Map from '../components/map/index'

const HomePage = () => (
  <Layout page="carte">
    <h1>Carte</h1>
    <article>
      <Map/>
    </article>
  </Layout>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage);