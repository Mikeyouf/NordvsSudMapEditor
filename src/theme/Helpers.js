import { css } from 'styled-components'
import { darken, lighten } from 'polished'

export const colors = {
  primary: '#797335',
  primaryLight: lighten(0.2, '#797335'),
  primaryDark: darken(0.05, '#797335'),
  primaryTransparent: 'rgba(84, 132, 150, 0.5)',
  accent: '#3855E9',
  accentLight: lighten(0.1, '#3855E9'),
  accentDark: darken(0.2, '#3855E9'),
  white: '#f1f4f5',
  black: '#20272b',
  grey: '#354147',
  lightGrey: '#969ea2',
  darkWhite: darken(0.05, '#f1f4f5'),
  red: '#E93855',
  lightRed: lighten(0.1, '#E93855'),
  darkRed: darken(0.2, '#E93855'),
}

export const pxToRem = (px = 16) => {
  return `${px / 16}rem`
}

export const layout = (px = 1170) => {
  return `
    max-width: ${pxToRem(px)};
    margin: 0 auto;
    padding: 0 ${pxToRem(8)};`
}

const sizes = {
  large: 1200,
  medium: 920,
  small: 600
}

export const fonts = {
  fontTitre: "lora",
  fontTexte: "poppins",
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}rem) {
      ${css(...args)}
    }
  `
  return acc
}, {})
