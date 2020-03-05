import styled from 'styled-components'
import { pxToRem, fonts, colors } from '../../theme/Helpers'

export const Article = styled.article`
    padding: ${pxToRem(16)};
`

export const Header = styled.header`
    width: ${pxToRem(800)};
    height: ${pxToRem(100)};
    padding: ${pxToRem(8)};
    border: 1px solid ${colors.accentLight};
    border-top: none;
    border-radius: 0 0 5px 5px;
    background: ${colors.accent};
    margin: 0 auto;
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