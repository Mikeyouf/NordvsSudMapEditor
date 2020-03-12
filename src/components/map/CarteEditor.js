import React, { useState, useEffect } from 'react'
import { withFirebase } from '../../firebase/index';
import { compose } from 'recompose';
import useForm from '../../hooks/useForm'
import validate from '../../utils/validate'

import CarteHeader from './CarteHeader';
import CarteTerrains from './CarteTerrains';
// import Carte from './Carte';
import Cell from './Cell';

import { Article, Wrapper } from './style'

const INITIAL_VALUES = {
    colonnes : '',
    lignes : '',
    // terrain: 0,
}

const CarteEditor = ({ firebase }) => {
    const [ currentLignes, setCurrentLignes ] = useState(0)
    const [ currentColonnes, setCurrentColonnes ] = useState(0)
    const [ valuesTerrain, setValuesTerrain ] = useState('plaine')
    const [myArray, setMyArray] = useState([])
    // recupère le nombre de colonnes et de lignes
    const handleCreateValues = () => {
        const { colonnes, lignes } = values
        setCurrentLignes(lignes)
        setCurrentColonnes(colonnes)
        createMap(lignes, colonnes)
    }
    const { handleSubmit, handleChange, values } = useForm(INITIAL_VALUES, validate, handleCreateValues)

    useEffect(() => {
        if (!JSON.parse(window.localStorage.getItem("myArray"))) return;
        if (!JSON.parse(window.localStorage.getItem("ligne"))) return;
        if (!JSON.parse(window.localStorage.getItem("colonne"))) return;

        const newLigne = JSON.parse(window.localStorage.getItem("ligne"));
        setCurrentLignes(newLigne)
        const newColonne = JSON.parse(window.localStorage.getItem("colonne"));
        setCurrentColonnes(newColonne)
        const newArray = JSON.parse(window.localStorage.getItem("myArray"));
        setMyArray(newArray)
    }, [])

    useEffect(() => {
        window.localStorage.setItem("myArray", JSON.stringify(myArray))
        window.localStorage.setItem("ligne", JSON.stringify(currentLignes))
        window.localStorage.setItem("colonne", JSON.stringify(currentColonnes))
    }, [myArray, valuesTerrain, currentLignes, currentColonnes])

    const handleChangeTerrain = async event => {
        event.persist();
        setValuesTerrain(event.target.value)
    }

    const createMap = (lignes, colonnes) => {
        for(let i = 0; i < lignes; i++) {
            for(let j = 0; j < colonnes; j++) {
                if(j !== 0 && i !== 0) {
                    setMyArray(oldArray => ([...oldArray, { name: "terrain", id: `${i}/${j}`, type: "plaine" }]))
                } else {
                    if( j === 0 ) {
                        setMyArray(oldArray => ([...oldArray, { name: "y", id: i }]))
                    }

                    if (i === 0 && j !== 0) {
                        setMyArray(oldArray => ([...oldArray, { name: "x", id: j }]))
                    }
                }
            }
        }
    }

    return(
        <Article>
            <CarteHeader handleSubmit={handleSubmit} handleChange={handleChange} values={values}/>
            <CarteTerrains handleChange={handleChangeTerrain}/>
            <Wrapper colonnes={currentColonnes} lignes={currentLignes}>
                {
                    myArray.map((elt, i) => 
                        elt.name === 'x' ?
                        <Cell key={i} coordonnee={true} x={elt.id} terrain={valuesTerrain} />
                        :
                        elt.name === 'y' ?
                        <Cell key={i} coordonnee={true} y={elt.id} terrain={valuesTerrain} index={i} type={elt.type} setMyArray={setMyArray}/>
                        :
                        <Cell key={i} coordonnee={false} terrain={valuesTerrain} index={i} type={elt.type} setMyArray={setMyArray} myArray={myArray}/>
                    )
                }
            </Wrapper>
        </Article>
    )
}

export default compose(
    withFirebase
  )(CarteEditor);