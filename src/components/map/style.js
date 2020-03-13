import styled from 'styled-components'
import { pxToRem, fonts, colors } from '../../theme/Helpers'

export const Article = styled.article`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
`

export const Header = styled.header`
    grid-column: 1 / 5;
    grid-row: 1 / 2;
    justify-self: center;
    min-width: ${pxToRem(720)};
    height: ${pxToRem(100)};
    padding: ${pxToRem(8)};
    border: 1px solid ${colors.accentLight};
    border-top: none;
    border-radius: 0 0 5px 5px;
    background: ${colors.accent};
    font-family: ${fonts.fontTexte};
    color: ${colors.white};
    box-shadow: 3px 3px 3px 1px ${colors.accentRGBA};
    display: flex;
    align-items: center;
`

export const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`

export const Input = styled.input`
    border: none;
    border-bottom: 1px solid ${colors.white};
    width: ${pxToRem(120)};
    color: ${colors.white};
`

export const Button = styled.button`
    border: 1px solid ${colors.white};
    width: ${pxToRem(120)};
    border-radius: 4px;
    color: ${colors.white};
    cursor: pointer;
    padding: ${pxToRem(8)};
    transition: all 0.3s ease-in;
    font-size: ${pxToRem(18)};
    box-shadow: 3px 3px 3px 1px ${colors.accentRGBA};

    &:hover {
        background: ${colors.white};
        color: ${colors.accent};
        transition: all 0.3s ease-in;
        border: 1px solid ${colors.accentLight};
    }
`

export const ButtonAside = styled(Button)`
    width: 100%;
`

export const Aside = styled.aside`
    grid-column: 5 / 6;
    grid-row: 1 / -1;
    justify-self: end;
    width: ${pxToRem(160)};
    max-height: 100vh;
    padding: ${pxToRem(8)};
    border: 1px solid ${colors.accentLight};
    border-right: none;
    border-radius: 5px 0 0 5px;
    background: ${colors.accent};
    font-family: ${fonts.fontTexte};
    color: ${colors.white};
    box-shadow: -3px -3px 3px 1px ${colors.accentRGBA};
    display: flex;
    flex-direction: column;
`

export const InputWrapper = styled.div`
    margin: ${pxToRem(8)} 0;

    input {
        margin: 0 ${pxToRem(8)};
    }
`

export const Wrapper = styled.div`
    margin: 0 ${pxToRem(16)};
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    width: ${ ({ colonnes }) => colonnes * 64 + 'px' };
    min-width: ${ ({ colonnes }) => colonnes * 64 + 'px' };
    height: ${ ({ lignes }) => lignes * 64 + 'px' };
    min-height: ${ ({ lignes }) => lignes * 64 + 'px' };
    display: flex;
    flex-wrap: wrap;
`
