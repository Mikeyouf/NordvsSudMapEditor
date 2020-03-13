import React from 'react'

import { Header, Input, Button, Form } from './style'

const CarteHeader = ({ handleSubmit, handleChange, values, handleReset }) => {
    return(
        <Header id="inputElts" className="container">
            <Form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nbrDeDiv">Nbr de Col:</label>
                    <Input onChange={handleChange} value={values.colonnes} type="text" name="colonnes" id="colonnes" maxLength="3" placeholder="colonnes" required/>
                </div>
                <div>
                    <label htmlFor="nbrDeCol">Nbr de lignes:</label>
                    <Input onChange={handleChange} value={values.lignes} type="text" name="lignes" id="lignes" maxLength="3" placeholder="lignes" required />
                </div>
                <Button type="submit">Valider</Button>
                <Button type="reset" onClick={() => handleReset()}>Reset</Button>
            </Form>
        </Header>
    )
}

export default CarteHeader;