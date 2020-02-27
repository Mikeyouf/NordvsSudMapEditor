import React, {useState} from 'react'
import Navigation from './Navigation'
import GlobalStyle from '../theme/GlobalStyle'
import { useWindowSize } from '../hooks/useResize'

import styled from 'styled-components'
import { colors, pxToRem } from '../theme/Helpers'

import { TiChevronRightOutline, TiChevronLeftOutline } from "react-icons/ti";
import { IconContext } from "react-icons"

const Page = styled.section`
    display: flex;
`

const Aside = styled.aside`
    background: ${colors.accent};
    padding: ${pxToRem(8)};
    box-shadow: 0 5px 4px 5px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    width: ${({ open }) => open ? `${pxToRem(200)}` : `${pxToRem(80)}`};
    transition: all 0.3s ease-in;
    max-height: 100vh;

    div {
        width: 100%;

        .icone {
            color: ${colors.white};
            font-size: ${pxToRem(24)};
            cursor: pointer;
        }
    }

    div:nth-child(1) {
        display: flex;
        justify-content: flex-end;
    }

`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 32px);
    padding-bottom: ${pxToRem(24)};
`

const Section = styled.section`
    width: 100%;
    height: 100%;
`

const TemplateWrapper = ({ children, page }) => {
  let size = useWindowSize();
  const [ open, setOpen ] = useState(true)

  return (
    <Page>
        <GlobalStyle/>
        <Aside open={open}>
            <div>
                <IconContext.Provider value={{ className: "icone" }}>
                    {
                        open ?
                        <TiChevronLeftOutline onClick={() => setOpen(!open)} />
                        :
                        <TiChevronRightOutline onClick={() => setOpen(!open)} />
                    }
                </IconContext.Provider>
            </div>
            <div>
                <Nav>
                    <Navigation pageActive={page} size={size} open={open}/>
                </Nav>
            </div>
        </Aside>
        <Section>{children}</Section>
    </Page>
  )
}

export default TemplateWrapper