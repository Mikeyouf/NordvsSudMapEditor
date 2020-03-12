import React from 'react';
import { withAuthorization, AuthUserContext } from '../components/session/index';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';

import Layout from '../components/Layout'
import CarteReader from './../components/map/CarteReader';
import CarteEditor from './../components/map/CarteEditor';

const HomePage = () => {
  // const [ loading, setLoading ] = useState(false)
  // const urldeDurango = 'https://nord.zd.fr/script.php?xMin=0&xMax=5&yMin=0&yMax=5'
  // useEffect(() => {
  //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
  //   const url = "https://nord.zd.fr/script.php?";
  //   const params = 'xMin=' + 0 + '&xMax=' + 5 + '&yMin=' + 0 +  '&yMax=' + 7;
  //   fetch(proxyurl + url + params, {
  //     method: 'post',
  //     headers: {
  //       'Content-type': 'application/x-www-form-urlencoded'
  //     },
  //    })
  //   .then(response => console.log(response.json()))
  //   .then(contents => console.log(contents))
  //   .catch(error => console.log(error.message))
  // })


  return(
    <AuthUserContext.Consumer>
      {
        authUser => (
          <Layout page="carte">
                {/* {loading && <div>Loading ...</div>} */}
                {
                    authUser.roles[ROLES.EDITOR] ? <CarteEditor/>
                    :
                    authUser.roles[ROLES.READER] && <CarteReader/>
                }
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