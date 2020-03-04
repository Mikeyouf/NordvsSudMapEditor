import React, { useState } from 'react';
import { withAuthorization, AuthUserContext } from '../components/session/index';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';

import Layout from '../components/Layout'
import Map from '../components/map/index'

const HomePage = () => {
  const [ loading, setLoading ] = useState(false)
  return(
    <AuthUserContext.Consumer>
      {
        authUser => (
          <Layout page="carte">
            <h1>Carte</h1>
            {/* {console.log(authUser.roles)} */}
            <article>
              {loading && <div>Loading ...</div>}
              {
                  authUser.roles[ROLES.READER] &&
                  <p>tu es un lecteur</p>
              }
              {
                  authUser.roles[ROLES.EDITOR] &&
                  <p>tu es un éditeur</p>
              }
              {
                  authUser.roles[ROLES.ADMIN] &&
                  <p>tu es un admin</p>
              }
              <Map/>
            </article>
          </Layout>
        )
      }
    </AuthUserContext.Consumer>
  )
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(HomePage);