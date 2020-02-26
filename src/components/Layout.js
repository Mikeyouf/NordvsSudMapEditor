import React from 'react'
import Navigation from './Navigation'
import GlobalStyle from '../theme/GlobalStyle'
import { useWindowSize } from '../hooks/useResize'

const TemplateWrapper = ({ children, page }) => {
  let size = useWindowSize();

  return (
    <div>
        <GlobalStyle/>
        <Navigation pageActive={page} size={size} />
        <div>{children}</div>
    </div>
  )
}

export default TemplateWrapper