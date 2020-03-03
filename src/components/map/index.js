import React, { useState, useEffect } from 'react'

const Map = () => {
    const [ data, setData ] = useState([])

    useEffect(() => {
        fetch(
            `https://world-351.fr.planethoster.net:2083/cpsess6970483074/3rdparty/phpMyAdmin/index.php`,
            {
                mode: 'cors',
                method: "GET",
                headers: new Headers({
                    'Access-Control-Allow-Origin': '*'
                })
            }
          )
            .then(res => res.json())
            .then(response => {
              setData(response)
            })
            .catch(error => console.log(error));
    })
    return(
        <div>
            test
            {
            console.log(data)
            }
        </div>
    )
}

export default Map