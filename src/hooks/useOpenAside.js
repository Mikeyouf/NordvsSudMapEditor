import { useState } from 'react'

const useOpenAside = () => {
    const [open, setOpen] = useState(true)

    const handleSetOpen = () => {
        setOpen(prevOpen => !prevOpen)
    }

    return {
        handleSetOpen,
        open
    }
}
 
export default useOpenAside;