import React from 'react'
import styled from 'styled-components'
import { pxToRem } from '../../theme/Helpers'

const Wrapper = styled.div`
    margin: ${pxToRem(16)};
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    width: ${ ({ colonnes }) => colonnes * 64 + 'px' };
    min-width: ${ ({ colonnes }) => colonnes * 64 + 'px' };
    height: ${ ({ lignes }) => lignes * 64 + 'px' };
    min-height: ${ ({ lignes }) => lignes * 64 + 'px' };
    display: flex;
    flex-wrap: wrap;
`

const Carte = ({ lignes, colonnes, myArray }) => {

    return (
        <Wrapper colonnes={colonnes} lignes={lignes}>
            {myArray}
        </Wrapper>
    )
}

export default Carte