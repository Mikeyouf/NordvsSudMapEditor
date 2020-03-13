import React from 'react'
import styled from 'styled-components'
import { pxToRem } from '../../theme/Helpers'

import champ from '../../img/2d/champ.gif'
import foret from '../../img/2d/foret.gif'
import marais from '../../img/2d/marais.gif'
import montagne from '../../img/2d/montagne.gif'
import plaine from '../../img/2d/plaine.gif'
import riviere from '../../img/2d/riviere.gif'

const Div = styled.div`
    border: 1px solid grey;
    width: ${pxToRem(64)};
    min-width: ${pxToRem(64)};
    height: ${pxToRem(64)};
    min-height: ${pxToRem(64)};
    text-align: center;

    &.plaine {
        background: url(${plaine}) center/cover no-repeat;
    }

    &.montagne {
        background: url(${montagne}) center/cover no-repeat;
    }

    &.riviere {
        background: url(${riviere}) center/cover no-repeat;
    }

    &.champ {
        background: url(${champ}) center/cover no-repeat;
    }

    &.foret {
        background: url(${foret}) center/cover no-repeat;
    }

    &.marais {
        background: url(${marais}) center/cover no-repeat;
    }
`

const Cell = ({ coordonnee, setMyArray, terrain, x, y, myArray, type, index }) => {

    const handleSetCurrentTerrain = index => {
        if(!myArray) return
        let oldArray = [...myArray]
        oldArray[index].type = terrain
        setMyArray(oldArray)
    }

    return(  
        <Div
          onClick={handleSetCurrentTerrain ? () => handleSetCurrentTerrain(index) : null}
          className={`terrain ${coordonnee ? "" : type}`}
        >
            { coordonnee ? x ? x : y : null }
        </Div>
    )
}

export default Cell