import { createGlobalStyle } from 'styled-components'

import { colors } from './Helpers'

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'

const Global = createGlobalStyle`
    ::selection {
        background: ${colors.primary};
    }

    body {
        font-size: 16px;
        transition: 600ms;
        color: ${colors.black};
        background: ${colors.white};
    }

    .bolder {
        font-weight: 900;
    }

    .bold {
        font-weight: 700;
    }

    /* .accent {
        color: ${colors.accent}
    } */

    a {
        /* color: ${colors.white}; */
        text-decoration: none;
        list-style: none;
        outline: none;
    }

    a:focus {
        outline: 0;
    }

    #gatsby-noscript {
        display: none;
    }
`

export default Global