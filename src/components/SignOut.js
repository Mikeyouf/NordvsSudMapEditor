import React from 'react';
import { withFirebase } from '../firebase/index';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';

import { TiPowerOutline } from "react-icons/ti";
import { IconContext } from "react-icons"

const SignOutButton = ({ firebase }) => (
  <Link to={ROUTES.LANDING}>
    <button type="button" onClick={firebase.doSignOut}>
      <IconContext.Provider value={{ className: "icone" }}>
        <TiPowerOutline/>
      </IconContext.Provider>
      <span>
        déconnfexion
      </span>
    </button>
  </Link>
);
export default withFirebase(SignOutButton);