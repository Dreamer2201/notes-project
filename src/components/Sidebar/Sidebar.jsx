import React from 'react'
import { useState } from 'react';
import styles from './sidebar.module.scss'
import ListItem from '../ListItem/ListItem';


export default function Sidebar({notes }) {
    const [activeNote, setActiveNote] = useState(null)

    const changeActiveNote = (note) => {
      setActiveNote(note)
    }

    const elements = notes.map((item) => {
        return (<ListItem key={item.id} note={item} changeActive={changeActiveNote} activeNote={activeNote} />)
   });
   
   
  return (
    <div className={styles.wrapperSidebar}>
        {notes && <ul>
            {elements}
        </ul>}
    </div>
    
  )
}
