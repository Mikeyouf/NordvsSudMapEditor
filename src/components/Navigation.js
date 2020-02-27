import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

import { AuthUserContext } from './session/index';

import styled from 'styled-components'
import { colors, pxToRem, fonts } from '../theme/Helpers'

const LiElt = styled.li`
  margin: ${pxToRem(8)} 0;
  font-family: ${fonts.fontTexte};
  font-size: ${pxToRem(20)};

  a {
    color: ${colors.white};

    button {
      border: 1px solid ${colors.white};
      border-radius: 4px;
    }
  }

  &.active > a {
    color: ${colors.accentDark};
  }

`


const Navigation = ({ setPageActive, pageActive }) => {
  return (
    <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} setPageActive={setPageActive} pageActive={pageActive} />
      ) : (
        <NavigationNonAuth setPageActive={setPageActive} pageActive={pageActive} />
      )
    }
    </AuthUserContext.Consumer>
  )
};

const NavigationAuth = ({ authUser, setPageActive, pageActive }) => (
    <ul>
      <LiElt className={pageActive === 'accueil' ? 'active' : ''}>
        <Link to={ROUTES.LANDING}>Accueil</Link>
      </LiElt>
      <LiElt className={pageActive === 'carte' ? 'active' : ''}>
        <Link to={ROUTES.HOME}>Carte</Link>
      </LiElt>
      <LiElt className={pageActive === 'profil' ? 'active' : ''}>
        <Link to={ROUTES.ACCOUNT}>Profil</Link>
      </LiElt>
      {!!authUser.roles[ROLES.ADMIN] && (
        <LiElt className={pageActive === 'admin' ? 'active' : ''}>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </LiElt>
      )}
      <LiElt>
        <SignOutButton />
      </LiElt>
    </ul>
);

const NavigationNonAuth = ({ setPageActive, pageActive }) => (
    <ul>
      <LiElt className={pageActive === 'accueil' ? 'active' : ''} name='accueil'>
        <Link to={ROUTES.LANDING}>Accueil</Link>
      </LiElt>
      <LiElt className={pageActive === 'connexion' ? 'active' : ''} name='connexion'>
        <Link to={ROUTES.SIGN_IN}>Se connecter</Link>
      </LiElt>
    </ul>
);

export default Navigation