import React from 'react'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import {noteContext} from '../../context'
import styles from './workspace.module.scss'
import { nanoid } from 'nanoid';


export default function Workspace({add, update, activeNote }) {
  const [text, setText] = useState('')

  const context = useContext(noteContext)
  
  useEffect(() => {
    setText(context.note.text)
  }, [context])


  const onTextAreaChange = e => {
    console.log(e.currentTarget.value)
      setText(e.currentTarget.value);
  }

  const onUpdateNotice = async (e) => { 
    e.preventDefault()
    if(context.note.id.trim().length) {
      const newNotice = {
        id: context.note.id,
        text,
        createdAT: new Date()
      }
  
      console.log('updated note')
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
      console.log('added note')
      context.changeNote(newNote)
    }
  }


  return (
    <form className={styles.form} onSubmit={onUpdateNotice} >
        <input className={styles.input}
        name="notice"
        typeof="textarea"
        placeholder="Enter text notice"
        value={text}
        onChange={onTextAreaChange}
        >
        </input>
        <button 
        className={styles.button} 
        type='submit'
        > Save
        </button>
    </form>
  )
}