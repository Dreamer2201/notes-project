import React from 'react'
import { useContext } from 'react';
import {noteContext} from '../../context'
import styles from '../ListItem/listitem.module.scss'

export default function ListItem({note, changeActive }) {
 
  const context = useContext(noteContext)

  const setActiveNote = (note) => {
    if(note.id === context.note.id) {
      return
    } else {
      changeActive(note)
      context.changeNote({
      id: note.id,
      text: note.text
    })
    }
  }

  const isActive = note.id === context.note.id

  return (
    <li className={isActive ? `${styles.item} ${styles.active}` : `${styles.item}`} onClick={() => setActiveNote(note)}>

        <p>{note.text}</p>
        <p>time</p>

    </li>
  )
}
