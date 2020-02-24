import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';
import { withAuthorization, withEmailVerification  } from '../components/session/index';
import { withFirebase } from '../../src/firebase/index';
import { Switch, Route, Link } from 'react-router-dom';

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

class UserListBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }
  componentDidMount() {
      this.setState({ loading: true });
      const handleSnapshot = snapshot => {
          const usersObject = snapshot.docs;
          const usersList = usersObject.map(doc => ({
              ...doc.data(),
              uid: doc.data().id
          }));
          
          this.setState({
              users: usersList,
              loading: false,
          });
          
      }
      this.props.firebase.db.collection('users').onSnapshot(handleSnapshot)
  }
  componentWillUnmount() {
      this.props.firebase.db.collection('users');
  }

  render() {
      const { users, loading } = this.state;

      return (
        <div>
          <h2>Users</h2>
          {loading && <div>Loading ...</div>}
          <ul>
            {users.map(user => (
              <li key={user.uid}>
                <span>
                  <strong>Username:</strong> {user.username}
                </span>
                <span>
                  <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                    Details
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase.db.collection('users').doc(this.props.match.params.id)
      .get()
      .then(snapshot => {
        this.setState({
            user: snapshot.data(),
            loading: false,
        });
      })
  }

  componentWillUnmount() {
    this.props.firebase.db.collection('users')
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.id}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <button
                type="button"
                onClick={this.onSendPasswordResetEmail}
              >
                Send Password Reset
              </button>
            </span>
            <div>
              <span>
                <Link to={ROUTES.ADMIN}>
                  Retour
                </Link>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);