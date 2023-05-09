import { useState, createContext } from "react"

export const noteContext = createContext('')

const NoteContext = ({children}) => {
    const [note, setNote] = useState({
        id: "",
        text: "",
    })

    const changeNote = (note) => {
        setNote(note)
    }
    
    return (
        <noteContext.Provider value={{note, changeNote}} >
            {children}
        </noteContext.Provider>
    )
}

export default NoteContext