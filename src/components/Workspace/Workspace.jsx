import React from 'react'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import {noteContext} from '../../context'
import styles from './workspace.module.scss'
import { nanoid } from 'nanoid';


export default function Workspace({add, update }) {
  const [text, setText] = useState('')

  const context = useContext(noteContext)
 

  useEffect(() => {
    setText(context.note.text)
  }, [context])

  const onTextAreaChange = (event) => {
      setText(event.target.value)   
  }

  const onUpdateNotice = async (e) => { 
    e.preventDefault()
    if(context.note.id.trim().length) {
      const newNotice = {
        id: context.note.id,
        text,
        createdAT: new Date()
      }
      update(newNotice)
      context.changeNote(newNotice)
      return
    } else {
      const idNewNote = nanoid()
      const newNote = {
        id: idNewNote,
        text,
        createdAT: new Date()
      }
      add(newNote)
      context.changeNote(newNote)
    }
  }


  return (
    <>
      <form className={styles.form} onSubmit={onUpdateNotice} >
        <textarea className={styles.input}
        name="notice"
        typeof="textarea"
        placeholder="Enter text notice"
        value={text}
        onChange={onTextAreaChange}
        >
        </textarea>
        <button 
        className={styles.button} 
        type='submit'
        > Save
        </button>
      </form>
    </>
    
   
  )
}
