import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';
import { withAuthorization, withEmailVerification } from '../components/session/index';
import { withFirebase } from '../../src/firebase/index';
import { Switch, Route, Link } from 'react-router-dom';
import Layout from '../components/Layout'
import { TiArrowBackOutline } from "react-icons/ti";

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
  border-radius: 4px;
  padding: ${pxToRem(16)} ${pxToRem(8)};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 3px 3px ${colors.accentRGBA};

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
        {users.map((user, i) => (
          <li key={user.uid}>
            <p>
              {i + 1}
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

const User = styled.div`
  width: 100%;
`

const Ligne = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${pxToRem(8)};
  font-family: ${fonts.fontTexte};

  &:nth-child(odd) {
    background: ${colors.accentRGBA};
  }

  p {

    &:nth-child(1) {
      font-weight: bold;
    }
  }
`

const RolesWrapper = styled.div`
  margin-top: ${pxToRem(16)};
  padding: ${pxToRem(8)};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${colors.accentRGBA};

  div {
    width: ${pxToRem(180)};
    margin: ${pxToRem(8)} 0;
    text-align: center;

    &:nth-child(4) {
      width: ${pxToRem(260)};
    }

    input {
      margin-left: ${pxToRem(8)};
    }
  }
`

const Button = styled.button`
  border: 1px solid ${colors.accent};
  border-radius: 4px;
  color: ${colors.accent};
  cursor: pointer;
  padding: ${pxToRem(8)} ${pxToRem(16)};
  transition: all 0.3s ease-in;
  font-size: ${pxToRem(18)};
  box-shadow: 3px 3px 3px 1px ${colors.accentRGBA};

  &:hover {
    background: ${colors.accent};
    color: ${colors.white};
    transition: all 0.3s ease-in;
    border: 1px solid ${colors.accentLight};
  }
`

const Back = styled.div`
  padding: ${pxToRem(8)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: ${colors.accent};
    border: 1px solid ${colors.accent};
    border-radius: 4px;
    padding: ${pxToRem(8)} ${pxToRem(16)};
    transition: all 0.3s ease-in;
    font-size: ${pxToRem(18)};
    box-shadow: 3px 3px 3px 1px ${colors.accentRGBA};

    &:hover {
      background: ${colors.accent};
      color: ${colors.white};
      transition: all 0.3s ease-in;
      border: 1px solid ${colors.accentLight};
    }

    span {
      margin-left: ${pxToRem(8)};
    }
  }

`

const UserItemBase = ({ firebase, ...props }) => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ authUser, setAuthUser ] = useState('')
  const [ roleUser, setRoleUser ] = useState([])
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

  useEffect(() => {
    if(user) {
      const role = [];
      Object.keys(user.roles).map(item => item && role.push(user.roles[item]));
      const newRole = role.filter(elt => elt !== "");
      setRoleUser(newRole);
    }
  }, [user])

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
      await setUser(prevValues => ({
        ...prevValues,
        roles : roles
      }))
    }
  };

  return (
    <Users>
      <h2>Utilisateur ({authUser || props.match.params.id})</h2>
      {loading && <div>Loading ...</div>}
      {user && (
        <User>
          <Ligne>
            <p>ID:</p>
            <p>{user.id}</p>
          </Ligne>
          <Ligne>
            <p>E-Mail:</p>
            <p>{user.email}</p>
          </Ligne>
          <Ligne>
            <p>Nom:</p>
            <p>{user.username}</p>
          </Ligne>
          <Ligne>
            <p>Rôle{roleUser.length > 1 ? 's' : ''}:</p>
            {Object.keys(user.roles).map((role,i) => (
            <p key={i}>{user.roles[role]}</p>
            ))}
          </Ligne>
          <RolesWrapper>
            <div>
              <label htmlFor="admin">Admin ?</label>
              <input
                name="ADMIN"
                id="admin"
                type="checkbox"
                checked={user.roles.ADMIN ? true : false}
                onChange={e => onChangeCheckbox(e, 'ADMIN')}
              />
            </div>
            <div>
              <label htmlFor="reader">Reader ?</label>
              <input
                name="READER"
                id="reader"
                type="checkbox"
                checked={user.roles.READER ? true : false}
                onChange={e => onChangeCheckbox(e, 'READER')}
              />
            </div>
            <div>
              <label htmlFor="editor">Editor ?</label>
              <input
                name="EDITOR"
                id="editor"
                type="checkbox"
                checked={user.roles.EDITOR ? true : false}
                onChange={e => onChangeCheckbox(e, 'EDITOR')}
              />
            </div>
          </RolesWrapper>
          <Back>
            <Button
              type="button"
              onClick={() => onSendPasswordResetEmail()}
            >
              Envoyer un email de reset
            </Button>
            <Link to={ROUTES.ADMIN}>
              <TiArrowBackOutline/>
              <span>Retour</span>
            </Link>
          </Back>
        </User>
      )}
    </Users>
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