import React, { useState } from 'react';
import { withFirebase } from '../firebase/index';

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

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
};

const PasswordChangeForm = ({ firebase }) => {
  const [infos, setInfos] = useState(INITIAL_STATE)
  const [error, setError] = useState(null)

  const onSubmit = event => {
    const { passwordOne } = infos;
    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setInfos({ ...INITIAL_STATE });
      })
      .catch(error => {
        setError({ error });
      });
    event.preventDefault();
  };

  const onChange = event => {
    event.persist()
        setInfos(prevValues => ({
            ...prevValues,
            [event.target.name] : event.target.value
        }))
  };

  const isInvalid = infos.passwordOne !== infos.passwordTwo || infos.passwordOne === '';

  return(
    <Form onSubmit={e => onSubmit(e)}>
        <input
          name="passwordOne"
          value={infos.passwordOne}
          onChange={e => onChange(e)}
          type="password"
          placeholder="Nouveau mot de passe"
        />
        <input
          name="passwordTwo"
          value={infos.passwordTwo}
          onChange={e => onChange(e)}
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
        />
        <Button disabled={isInvalid} type="submit">
          Changer mon mot de passe
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
  )
}

export default withFirebase(PasswordChangeForm);