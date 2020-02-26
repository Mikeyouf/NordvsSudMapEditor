import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../firebase/index';
import * as ROUTES from '../constants/routes';
import Layout from '../components/Layout'

const SignUpPage = () => (
  <Layout page="connexion">
    <h1>S'enregistrer</h1>
    <SignUpForm />
  </Layout>
)

const INITIAL_STATE = {
    username: '',
    email: '',
    id: '',
    passwordOne: '',
    passwordTwo: '',
}

const SignUpFormBase = ({ firebase, ...props }) => {
  const [ values, setValues ] = useState(INITIAL_STATE)
  const [ error, setError ] = useState(null)

  const onSubmit = event => {
    const { username, email, passwordOne } = values;
    const roles = {
      ADMIN: '',
      READER: '',
      EDITOR: '',
    };

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            id: authUser.user.uid,
            roles
          });
      })
      .then(() => {
        return firebase.doSendEmailVerification();
      })
      .then(() => {
        setValues(INITIAL_STATE)
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error)
      });
      event.preventDefault();
  }

  const onChange = event => {
    event.persist()
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name] : event.target.value
        }))
  };

  const {
    username,
    email,
    passwordOne,
    passwordTwo,
  } = values;

const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={e => onSubmit(e)}>
          <input
              name="username"
              value={username}
              onChange={e => onChange(e)}
              type="text"
              placeholder="Votre nom"
          />
          <input
              name="email"
              value={email}
              onChange={e => onChange(e)}
              type="text"
              placeholder="Votre addresse email"
          />
          <input
              name="passwordOne"
              value={passwordOne}
              onChange={e => onChange(e)}
              type="password"
              placeholder="Mot de passe"
          />
          <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={e => onChange(e)}
              type="password"
              placeholder="Confirmez votre mot de passe"
          />
          <button disabled={isInvalid} type="submit">S'enregistrer</button>
          {error && <p>{error.message}</p>}
      </form>
  );
}

const SignUpLink = () => (
  <p>
    Vous n'avez pas encore de compte ? <Link to={ROUTES.SIGN_UP}>Créer un compte</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };