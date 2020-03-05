import React, { useState } from 'react'
import { withFirebase } from '../../firebase/index';
import { compose } from 'recompose';
import useForm from '../../hooks/useForm'
import validate from '../../utils/validate'

import CarteHeader from './CarteHeader';

const INITIAL_VALUES = {
    colonnes : '',
    lignes : ''
}

const CarteEditor = ({ firebase }) => {
    const handleCreateValues = () => {
        const { colonnes, lignes } = values
        console.log(colonnes, lignes)
        // Utiliser les données pour créer la carte par ex
    }
    const { handleSubmit, handleChange, values } = useForm(INITIAL_VALUES, validate, handleCreateValues)

    return(
        <>
            <CarteHeader handleSubmit={handleSubmit} handleChange={handleChange} values={values}/>
        </>
    )
}

export default compose(
    withFirebase
  )(CarteEditor);