import React from 'react'
import { nanoid } from 'nanoid';
import { IconContext } from "react-icons"
import { useState, useContext } from 'react';
import {noteContext} from '../../context'
import { FaPlus } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"
import { FiEdit2 } from "react-icons/fi"
import styles from './searchbox.module.scss'
import Modal from '../Modal/ModalDelete'

export default function SearchBox({ removeNote, searchNotes }) {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const context = useContext(noteContext)

    const onCloseModal = () => {
        setIsOpenModal(false);
      };

    const filterId = nanoid();

    const addNewNote = () => {
        context.changeNote({id: '', text: ''})
        console.log('I am clean context')
        // повідомлення write your note
    }

    const onDelete = () => {
        setIsOpenModal(true)
  }

  return (
    <div className={styles.wrapperSearchBoxBtns}>
        <div>
            <button type='button' onClick={addNewNote} >
            <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                <div>
                    <FaPlus />
                </div>
            </IconContext.Provider>
            </button>
            <button type='button' onClick={onDelete} >
                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                    <div>
                        <RiDeleteBinLine />
                    </div>
                </IconContext.Provider>
            </button>
            <button type='button'>
                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                    <div>
                        <FiEdit2 />
                    </div>
                </IconContext.Provider>
            </button>
        </div>
        <div>
        <label htmlFor={filterId}>Find note</label>
            <input type="text" name="filter" id={filterId} onChange={searchNotes} />
        </div>
        {isOpenModal && <Modal isOpen={isOpenModal} close={onCloseModal} removeNote={removeNote}/>}
    </div>
  )
}
