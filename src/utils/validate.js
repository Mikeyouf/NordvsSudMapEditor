const validate = values => {
    const errors = {}

    if(!values.colonnes) {
        errors.colonnes = 'cette donnée est requise'
    } else if (!values.lignes) {
        errors.lignes = 'cette donnée est requise'
    }

    return errors
}

export default validate