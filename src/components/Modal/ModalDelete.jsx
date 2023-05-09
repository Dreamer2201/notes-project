import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import {noteContext} from '../../context'
import styles from './modal.module.scss'

const modalRoot = document.getElementById('modal-root');

export default function Modal({ isOpen, close, removeNote }) {

    const context = useContext(noteContext)

	useEffect(() => {
		document.addEventListener('keydown', closeModal);
		return () => document.removeEventListener('keydown', closeModal);
	});

	const closeModal = ({ target, currentTarget, code }) => {
		if (target === currentTarget || code === 'Escape') {
			close();
		}
	};

    const deleteNote = () => {
        const isChoosingNote = context.note.id.trim().length
        if(!isChoosingNote) {
            console.log('choose any note for delete')
            // choose any note for delete, please
			close()
			return
        } else {
			removeNote(context.note.id)
        	context.changeNote({id: '', text: ''})
			close()
		} 
      }

	if (!isOpen) return null;

	return createPortal(
		<div className={styles.overlayModal} onClick={closeModal}>
			<div className={styles.modal} onClick={closeModal}>
				<span className={styles.cross} id="icon-close" onClick={closeModal}>X</span>
				<p>Are you sure you want to delete note?</p>
				<div className={styles.wrapperBtns}>
					<button className={styles.button}
						type="button" onClick={deleteNote}
						>
						Delete
					</button>
					<button type="button" className={styles.button}
                     onClick={closeModal}>
						Cancel
					</button>
				</div>
			</div>
		</div>,
		modalRoot
	);
};