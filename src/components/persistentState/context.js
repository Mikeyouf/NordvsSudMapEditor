import React, { createContext, useState } from 'react'

export const asideContext = createContext(null)

const WithAside = ({ children }) => {
    const [ open, setOpen ] = useState(true)

    return(
        <asideContext.Provider value={[ open, setOpen ]}>
            {children}
        </asideContext.Provider>
    )
}

export default WithAside