import React from 'react'

import { Header, Input, Button, Form } from './style'

const CarteHeader = ({ handleSubmit, handleChange, values }) => {
    return(
        <Header id="inputElts" className="container">
            <Form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nbrDeDiv">Nbr de Col:</label>
                    <Input onChange={handleChange} value={values.colonnes} type="text" name="colonnes" maxLength="3" placeholder="colonnes" required/>
                </div>
                <div>
                    <label htmlFor="nbrDeCol">Nbr de lignes:</label>
                    <Input onChange={handleChange} value={values.lignes} type="text" name="lignes" maxLength="3" placeholder="lignes" required />
                </div>
                <Button type="submit">Valider</Button>
                <Button type="reset">Annuler</Button>
            </Form>
        </Header>
    )
}

export default CarteHeader;