import React, { useState, useEffect } from 'react'
import { withAuthorization  } from '../session/index';
import { withFirebase } from '../../firebase/index';
import { compose } from 'recompose';

const Map = ({ firebase, ...props}) => {
    // const [ data, setData ] = useState([]);

    // useEffect(() => {
    //     fetch(
    //         `https://world-351.fr.planethoster.net:2083/cpsess6970483074/3rdparty/phpMyAdmin/index.php`,
    //         {
    //             mode: 'cors',
    //             method: "GET",
    //             headers: new Headers({
    //                 'Access-Control-Allow-Origin': '*'
    //             })
    //         }
    //       )
    //         .then(res => res.json())
    //         .then(response => {
    //           setData(response)
    //         })
    //         .catch(error => console.log(error));
    // })

    return(
        <div>
            tu a accès à la carte et tu peux la modifier
        </div>
    )
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withFirebase
)(Map);