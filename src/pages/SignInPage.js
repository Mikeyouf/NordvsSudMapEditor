import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from './SignUpPage';
import { withFirebase } from '../firebase/index';
import * as ROUTES from '../constants/routes';
import { Img } from '@tueri/react'

import { PasswordForgetLink } from './PasswordForgetPage';
import Layout from '../components/Layout'

import styled from 'styled-components'
import { pxToRem, fonts, colors } from '../theme/Helpers'

const Wrapper = styled.div`
  width: ${pxToRem(420)};
  height: ${pxToRem(420)};
  margin: 0 auto;
  margin-top: calc(50vh - 210px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px 5px rgba(0, 0, 0, 0.3);
  padding: ${pxToRem(8)} ${pxToRem(16)};
  border-radius: 4px;
  background: ${colors.accent};
  position: relative;

  header {
    text-align: center;
    font-family: ${fonts.fontTitre};
    color: ${colors.white};
    text-transform: uppercase;
  }
`

const Article = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: -20;
`

const SignInPage = () => (
  <Layout page="connexion">
    <ImgWrapper>
      <Img src='https://userscontent2.emaze.com/images/2d48516c-35f5-4d13-a458-9dd4cb476a2b/e9fe166b0ecffa8db62f75230ddc8d91.jpg' alt="background bataille"/>
    </ImgWrapper>
    <Wrapper>
      <header>
        <h1>connexion</h1>
      </header>
      <Article>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </Article>
    </Wrapper>
  </Layout>
);

const Form = styled.form`
  padding: ${pxToRem(8)};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  font-family: ${fonts.fontTexte};

  input {
    border: none;
    border-bottom: 2px solid ${colors.white};
    color: ${colors.white};
    width: 100%;
  }

  button {
    border: 1px solid ${colors.white};
    border-radius: 4px;
    color: ${colors.white};
    cursor: pointer;
    padding: ${pxToRem(8)} ${pxToRem(16)};
    transition: all 0.3s ease-in;
    font-size: ${pxToRem(18)};

    &:hover {
      background: ${colors.white};
      color: ${colors.accentDark};
      transition: all 0.3s ease-in;
      border: 1px solid ${colors.accentDark};
    }
  }
`

const INITIAL_STATE = {
  email: '',
  password: '',
};

const SignInFormBase = ({ firebase, ...props }) => {
  const [ values, setValues ] = useState(INITIAL_STATE)
  const [ error, setError ] = useState(null)

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
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
  }

  const isInvalid = values.password === '' || values.email === '';

    return (
      <Form onSubmit={e => onSubmit(e)}>
        <input
          name="email"
          value={values.email}
          onChange={e => onChange(e)}
          type="text"
          placeholder="Votre addresse email"
        />
        <input
          name="password"
          value={values.password}
          onChange={e => onChange(e)}
          type="password"
          placeholder="Mot de passe"
        />
        <button disabled={isInvalid} type="submit">
          Se connecter
        </button>
        {error && <p>{error.message}</p>}
      </Form>
    );
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };