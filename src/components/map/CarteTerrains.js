import React from 'react'
import champ from '../../img/2d/champ.gif'
import foret from '../../img/2d/foret.gif'
import marais from '../../img/2d/marais.gif'
import montagne from '../../img/2d/montagne.gif'
import plaine from '../../img/2d/plaine.gif'
import riviere from '../../img/2d/riviere.gif'

import { Aside, InputWrapper } from './style'

const mesImages = [
    {name: 'champ', image: champ, id: 5},{name: 'foret', image: foret, id: 4},{name: 'marais', image: marais, id: 3},
    {name: 'montagne', image: montagne, id: 1},{name: 'plaine', image: plaine, id: 0},{name: 'riviere', image: riviere, id: 2},
]

const CarteTerrains = ({ handleChange }) => {
    return(
        <Aside>
            <form>
                {
                    mesImages.map(terrain => (
                        <InputWrapper key={terrain.id}>
                            <img src={terrain.image} alt={terrain.name}/>
                            <input onChange={e => handleChange(e)} type="radio" name="terrain" value={terrain.name} id={terrain.name} />
                            <label htmlFor={terrain.name}>{terrain.name}</label>
                        </InputWrapper>
                    ))
                }
                {/* <ButtonAside type="submit">Valider</ButtonAside> */}
            </form>
        </Aside>
    )
}

export default CarteTerrains