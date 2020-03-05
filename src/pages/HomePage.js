import React from 'react';
import { withAuthorization, AuthUserContext } from '../components/session/index';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';

import Layout from '../components/Layout'
import CarteReader from './../components/map/CarteReader';
import CarteEditor from './../components/map/CarteEditor';

import { pxToRem } from '../theme/Helpers'
import styled from 'styled-components'

const Article = styled.article`
    padding: 0 ${pxToRem(16)};
`

const HomePage = () => {
  // const [ loading, setLoading ] = useState(false)

  return(
    <AuthUserContext.Consumer>
      {
        authUser => (
          <Layout page="carte">
            <Article>
                {/* {loading && <div>Loading ...</div>} */}
                {
                    authUser.roles[ROLES.EDITOR] ? <CarteEditor/>
                    :
                    authUser.roles[ROLES.READER] && <CarteReader/>
                }
            </Article>
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