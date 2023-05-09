import React from 'react'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IconContext } from "react-icons"
import { useState, useContext } from 'react';
import {noteContext} from '../../context'
import { FaPlus } from "react-icons/fa"
import { RiDeleteBinLine } from "react-icons/ri"
// import { FiEdit2 } from "react-icons/fi"
import styles from './searchbox.module.scss'
import Modal from '../Modal/ModalDelete'

const toastParam = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: 'colored',
  };

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
        toast.info('Enter your note', toastParam)
    }

    const onDelete = () => {
        setIsOpenModal(true)
  }

  return (
    <div className={styles.wrapperSearchBoxBtns}>
        <div className={styles.wrapperBtns}>
            <button className={styles.button} type='button' onClick={addNewNote}
            
            >
            <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                <div>
                    <FaPlus />
                </div>
            </IconContext.Provider>
            </button>
            <button className={styles.button} type='button' disabled={!context.note.id.trim().length} onClick={onDelete} >
                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                    <div>
                        <RiDeleteBinLine />
                    </div>
                </IconContext.Provider>
            </button>
            {/* <button className={styles.button} type='button' disabled={!context.note.id.trim().length} >
                <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                    <div>
                        <FiEdit2 />
                    </div>
                </IconContext.Provider>
            </button> */}
            <ToastContainer />
        </div>
        <div>
        <label className={styles.label} htmlFor={filterId}>Find note</label>
            <input 
                className={styles.input} type="text" name="filter" id={filterId}
                placeholder='Find note'
                onChange={searchNotes} 
            />
        </div>
        {isOpenModal && <Modal isOpen={isOpenModal} close={onCloseModal} removeNote={removeNote}/>}
    </div>
  )
}
