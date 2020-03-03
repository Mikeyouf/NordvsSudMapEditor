import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../firebase/index';
import * as ROUTES from '../constants/routes';
import Layout from '../components/Layout'

import styled from 'styled-components'
import { pxToRem, fonts, colors } from '../theme/Helpers'

const Form = styled.form`
  font-family: ${fonts.fontTexte};
  font-size: ${pxToRem(16)};
  height: ${pxToRem(100)};

  input {
    border: none;
    border-bottom: 2px solid ${colors.accent};
    color: ${colors.accent};
    width: ${pxToRem(360)};
    height: ${pxToRem(45)};
    margin-right: ${pxToRem(16)};
    box-shadow: 0 3px 3px 0 ${colors.accentRGBA};
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

const PasswordForgetPage = () => (
  <Layout page="connexion">
    <h1>Mot de passe oublié</h1>
    <PasswordForgetForm />
  </Layout>
);

const INITIAL_STATE = {
  email: '',
};

const PasswordForgetFormBase = ({ firebase }) => {
  const [email, setEmail] = useState(INITIAL_STATE)
  const [error, setError] = useState(null)

  const onSubmit = event => {
    firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail(INITIAL_STATE)
      })
      .catch(error => {
        setError(error);
      });
    event.preventDefault();
  };

  const onChange = event => {
    event.persist()
        setEmail(prevValues => ({
            ...prevValues,
            [event.target.name] : event.target.value
        }))
  };

  const isInvalid = email === '';

    return (
      <Form onSubmit={e => onSubmit(e)}>
        <input
          name="email"
          value={email.email}
          onChange={e => onChange(e)}
          type="text"
          placeholder="Votre addresse email"
        />
        <Button disabled={isInvalid} type="submit">
          Récupérer un nouveau mot de passe
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Mot de passe oublié ?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };