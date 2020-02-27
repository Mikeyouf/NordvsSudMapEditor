import React from 'react'
import Navigation from './Navigation'
import GlobalStyle from '../theme/GlobalStyle'
import { useWindowSize } from '../hooks/useResize'

import styled from 'styled-components'
import { colors, pxToRem } from '../theme/Helpers'

const Page = styled.section`
    display: flex;
`

const Aside = styled.aside`
    background: ${colors.accentLight};
    padding: ${pxToRem(8)};
`

const Nav = styled.nav`
    display: flex;
    width: ${pxToRem(160)};
    height: 100%;
    min-height: calc(100vh - 16px);
    padding-left: ${pxToRem(16)};
`

const Section = styled.section`
    width: 100%;
    height: 100%;
`

const TemplateWrapper = ({ children, page }) => {
  let size = useWindowSize();

  return (
    <Page>
        <GlobalStyle/>
        <Aside>
            <Nav>
                <Navigation pageActive={page} size={size} />
            </Nav>
        </Aside>
        <Section>{children}</Section>
    </Page>
  )
}

export default TemplateWrapper