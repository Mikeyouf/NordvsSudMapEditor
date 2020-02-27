import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

import { AuthUserContext } from './session/index';

import { TiHomeOutline, TiLockOpenOutline, TiMap, TiUserOutline, TiEdit } from "react-icons/ti";
import { IconContext } from "react-icons"

import styled from 'styled-components'
import { colors, pxToRem, fonts } from '../theme/Helpers'

const LiElt = styled.li`
  margin: ${pxToRem(16)} 0;
  padding-left: ${pxToRem(16)};
  font-family: ${fonts.fontTexte};
  font-size: ${pxToRem(20)};
  height: ${pxToRem(24)};

  a {
    color: ${colors.white};
    display: flex;
    align-items: center;

    .icone {
      color: ${colors.white};
      margin-right: ${pxToRem(8)};
    }

    &.active {
      color: ${colors.accentDark};
    }

    &.active > .icone {
      color: ${colors.accentDark};
    }

    span {
      display: ${({ open }) => open ? 'block' : 'none'};
    }

  }


`

const ButtonWrapper = styled.div`
  margin: 0 auto;

  button {
      border: 1px solid ${colors.white};
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease-in;
      justify-self: flex-end;
      font-size: ${pxToRem(16)};
      color: ${colors.white};
      text-transform: uppercase;
      display: flex;
      align-items: center;
      padding: ${pxToRem(6)} ${pxToRem(8)};

      .icone {
        color: ${colors.white};
        /* font-size: ${pxToRem(18)}; */
        transition: all 0.3s ease-in;
      }

      &:hover {
        border: 1px solid ${colors.accentDark};
        color: ${colors.accentDark};
        background: ${colors.white};
        transition: all 0.3s ease-in;
      }

      &:hover .icone {
        color: ${colors.accentDark};
        transition: all 0.3s ease-in;
      }
    }
`


const Navigation = ({ setPageActive, pageActive, open }) => {
  return (
    <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} setPageActive={setPageActive} pageActive={pageActive} open={open} />
      ) : (
        <NavigationNonAuth setPageActive={setPageActive} pageActive={pageActive} open={open}/>
      )
    }
    </AuthUserContext.Consumer>
  )
};

const NavigationAuth = ({ authUser, setPageActive, pageActive, open }) => (
    <>
      <ul>
        <LiElt className={pageActive === 'accueil' ? 'active' : ''} open={open}>
          <Link to={ROUTES.LANDING}>
            <IconContext.Provider value={{ className: "icone" }}>
              <TiHomeOutline/>
            </IconContext.Provider>
            <span>
              Accueil
            </span>
          </Link>
        </LiElt>
        <LiElt className={pageActive === 'carte' ? 'active' : ''} open={open}>
          <Link to={ROUTES.HOME}>
            <IconContext.Provider value={{ className: "icone" }}>
              <TiMap/>
            </IconContext.Provider>
            <span>
              Carte
            </span>
          </Link>
        </LiElt>
        <LiElt className={pageActive === 'profil' ? 'active' : ''} open={open}>
          <Link to={ROUTES.ACCOUNT}>
            <IconContext.Provider value={{ className: "icone" }}>
              <TiUserOutline/>
            </IconContext.Provider>
            <span>
              Profil
            </span>
          </Link>
        </LiElt>
        {!!authUser.roles[ROLES.ADMIN] && (
          <LiElt className={pageActive === 'admin' ? 'active' : ''} open={open}>
            <Link to={ROUTES.ADMIN}>
              <IconContext.Provider value={{ className: "icone" }}>
                <TiEdit/>
              </IconContext.Provider>
              <span>
                Admin
              </span>
            </Link>
          </LiElt>
        )}
      </ul>
      <ButtonWrapper>
        <SignOutButton />
      </ButtonWrapper>
    </>
);

const NavigationNonAuth = ({ setPageActive, pageActive, open }) => (
    <ul>
      <LiElt className={pageActive === 'accueil' ? 'active' : ''} name='accueil' open={open}>
        <Link to={ROUTES.LANDING}>
          <IconContext.Provider value={{ className: `icone` }}>
            <TiHomeOutline/>
          </IconContext.Provider>
          <span>
            Accueil
          </span>
        </Link>
      </LiElt>
      <LiElt className={pageActive === 'connexion' ? 'active' : ''} name='connexion' open={open}>
        <Link to={ROUTES.SIGN_IN}>
          <IconContext.Provider value={{ className: "icone" }}>
            <TiLockOpenOutline/>
          </IconContext.Provider>
          <span>
            Connexion
          </span>
        </Link>
      </LiElt>
    </ul>
);

export default Navigation