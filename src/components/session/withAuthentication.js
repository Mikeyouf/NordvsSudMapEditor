import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../../firebase/index';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        },
      );
    }

    //TROUVER LE MOYEN DE UPDATE UNIQUEMENT UNE FOIS
    // componentDidUpdate(prevState) {
    //   if(prevState.authUser !== this.state.authUser) {
    //     this.props.firebase.onAuthUserListener(
    //       authUser => {
    //           this.setState({ authUser })
    //       }
    //     )
    //   }
    // }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;