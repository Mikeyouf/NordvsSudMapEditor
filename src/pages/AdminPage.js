import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';
import { withAuthorization, withEmailVerification } from '../components/session/index';
import { withFirebase } from '../../src/firebase/index';
import { Switch, Route, Link } from 'react-router-dom';
import Layout from '../components/Layout'

import styled from 'styled-components'
import { pxToRem, colors, fonts } from '../theme/Helpers'

const Wrapper = styled.article`
  padding: ${pxToRem(16)};

  h1 {
    color: ${colors.accent};
  }
`

const Users = styled.article`
  width: ${pxToRem(600)};
  border: 1px solid ${colors.accent};
  border-radius: 4px;
  padding: ${pxToRem(16)} ${pxToRem(8)};
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: ${colors.accentLight};
    margin: 0 auto;
  }
`

const Liste = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;

  li {
    font-family: ${fonts.fontTexte};
    display: flex;
    justify-content: space-between;

    p {

      &:nth-child(1) {
        font-weight: bold;
      }

      a {
        color: ${colors.accentDark};
      }
    }

    &:nth-child(odd) {
      background: ${colors.accentRGBA};
    }
  }
`

const AdminPage = ({ ...props }) => (
  <Layout page="admin">
    <Wrapper>
      <h1>Admin panel</h1>
      <Switch>
        <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} {...props}/>
        <Route exact path={ROUTES.ADMIN} component={UserList} {...props}/>
      </Switch>
    </Wrapper>
  </Layout>
);

const UserListBase = ({ firebase, ...props }) => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoading(true)

    const handleSnapshot = snapshot => {
      const usersObject = snapshot.docs;
      const usersList = usersObject.map(doc => ({
          ...doc.data(),
          uid: doc.data().id
      }));

      setUsers(usersList)
      setLoading(false)
    }

    const infos = firebase.db.collection('users').onSnapshot(handleSnapshot)

    return () => infos()

  }, [firebase.db])

  return (
    <Users>
      <h2>Utilisateurs</h2>
      {loading && <div>Loading ...</div>}
      <Liste>
        {users.map(user => (
          <li key={user.uid}>
            <p>
              Nom
            </p>
            <p>
              {user.username}
            </p>
            <p>
              <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
                Détails
              </Link>
            </p>
          </li>
        ))}
      </Liste>
    </Users>
  );
}

const UserItemBase = ({ firebase, ...props }) => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ authUser, setAuthUser ] = useState('')
  const match = props.match.params.id
  
  useEffect(() => {
    if (user) {
      return;
    }
    setLoading(true)
    
    const infos = firebase.db.collection('users').doc(match)
      .get()
      .then(snapshot => {
        setUser(snapshot.data())
        setAuthUser(snapshot.data().username)
        setLoading(false)
      })

    return () => infos

  }, [user, match, firebase.db])

  //update roles after change with checkbox
  useEffect(() => {
    const userRef = firebase.db.collection('users').doc(match)
    userRef.update({ ...user })
  }, [user, match, firebase.db])

  const onSendPasswordResetEmail = () => {
    firebase.doPasswordReset(user.email);
  };

  const onChangeCheckbox = async (event, role) => {
    
    if(event.target.checked) {
      const values = user.roles
      const roles = { ...values, [event.target.name] : role }
      await setUser(prevValues => ({
        ...prevValues,
        roles : roles
      }))
    } else {
      const values = user.roles
      const roles = { ...values, [event.target.name] : '' }
      await setUser({
        roles: roles
      })
    }
  };

  return (
    <div>
      <h2>Utilisateurs ({authUser || props.match.params.id})</h2>
      {loading && <div>Loading ...</div>}
      {user && (
        <div>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>E-Mail:</strong> {user.email}
          </p>
          <p>
            <strong>Nom:</strong> {user.username}
          </p>
          <div>
            <strong>Rôle(s):</strong> {Object.keys(user.roles).map((role,i) => (<p key={i}>{user.roles[role]}</p>))}
          </div>
          <div>
            <label>
              Admin?
              <input
                name="ADMIN"
                type="checkbox"
                checked={user.roles.ADMIN ? true : false}
                onChange={e => onChangeCheckbox(e, 'ADMIN')}
              />
            </label>
          </div>
          <div>
            <label>
              Reader?
              <input
                name="READER"
                type="checkbox"
                checked={user.roles.READER ? true : false}
                onChange={e => onChangeCheckbox(e, 'READER')}
              />
            </label>
          </div>
          <div>
            <label>
              EDITOR?
              <input
                name="EDITOR"
                type="checkbox"
                checked={user.roles.EDITOR ? true : false}
                onChange={e => onChangeCheckbox(e, 'EDITOR')}
              />
            </label>
          </div>
          <p>
            <button
              type="button"
              onClick={() => onSendPasswordResetEmail()}
            >
              Envoyer un email de reset
            </button>
          </p>
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

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);