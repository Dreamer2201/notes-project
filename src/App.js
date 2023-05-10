import { useState, useEffect } from 'react';
import NoteContext from './context'
import SearchBox from './components/SearchBox/SearchBox'
import Sidebar from './components/Sidebar/Sidebar'
import Workspace from './components/Workspace/Workspace'
import styles from './App.module.scss'


const idb = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB

const createCollectionInIndexDB = () => {
  if(!idb) {
    return
  }
  const request = idb.open("test-db", 2)

  request.onerror = (e) => {
    console.log('Error in IndexDB')
  }

  request.onupgradeneeded = (event) => {
    const db = request.result
    if (!db.objectStoreNames.contains("notices")) {
      db.createObjectStore("notices", {
        keyPath: "id",
      });
    } 

  }
  request.onsuccess = () => {
  }
}

function App() {
  const [notices, setNotices] = useState([]);
  const [isActiveNote, setIsActiveNote] = useState('')
  const[queryWord, setQueryWord] = useState('')

  useEffect(() => {
    createCollectionInIndexDB()
    getAllNotes()
  }, []) 


const getAllNotes = () => {
  const dbPromise = idb.open("test-db", 2)

  dbPromise.onsuccess = () => {
    const db = dbPromise.result
    const tx = db.transaction('notices', 'readonly')
    const data = tx.objectStore('notices')
    const notices = data.getAll()

    notices.onsuccess = (query) => {
      setNotices(query.srcElement.result)
    }
    notices.onerror = () => {
      console.log('error')
      }
    tx.oncomplete = () => {
      db.close()
    }
  }
}

const addNotice = (userNote) => {
  const dbPromise = idb.open("test-db", 2)
  dbPromise.onsuccess = () => {
    const db = dbPromise.result
    const tx = db.transaction('notices', 'readwrite')
    const notices = tx.objectStore('notices')
    const notice = notices.add(userNote)

    notice.onsuccess = () => {
      tx.oncomplete = () => {
        db.close()
        getAllNotes()
      }
      }

      notice.onerror = () => {
        console.log('error')
        }
    }
  }

  const updateNotice = (userNote) => {
    const dbPromise = idb.open("test-db", 2)
    dbPromise.onsuccess = () => {
      const db = dbPromise.result
      const tx = db.transaction('notices', 'readwrite')
      const notices = tx.objectStore('notices')
      const notice = notices.put(userNote)
  
      notice.onsuccess = () => {
        tx.oncomplete = () => {
          db.close()
          getAllNotes()
        }
        }
  
        notice.onerror = () => {
          console.log('error')
          }
      }
    }

  const deleteNote = (id) => {
    const dbPromise = idb.open("test-db", 2)
    dbPromise.onsuccess = () => {
      const db = dbPromise.result
      const tx = db.transaction('notices', 'readwrite')
      const notices = tx.objectStore('notices')
      const deletedNote = notices.delete(id)
  
      deletedNote.onsuccess = () => {
        getAllNotes()
        setIsActiveNote('')
        }

        deletedNote.onerror = () => {
          console.log('error')
          }
      }
    }

    const handleChangeFilter = (e) => {
      const { value } = e.target;
      setQueryWord(value);
    }

  const filterNotesByQuery = () => {
    if(!queryWord) {
      return notices
    }
    const queryNormolaze = queryWord.toLocaleLowerCase();
    const filterEmptyNotes = notices.filter(item => item.text !== undefined)
    const filterNotes = filterEmptyNotes.filter(item => item.text.toLocaleLowerCase().includes(queryNormolaze))
    return filterNotes
  }
  const filterNotes = filterNotesByQuery()

  const IsActiveNote = (note) => {
      setIsActiveNote(note)
    }

  return (
    <NoteContext value={isActiveNote} >
       <div className={styles.App}>
      <header className={styles.AppHeader}>
        <SearchBox removeNote={deleteNote} activeNote={isActiveNote} add={addNotice} searchNotes={handleChangeFilter} />
      </header>
      <main className={styles.AppMain}>
        <Sidebar notes={filterNotes} setActive={IsActiveNote} activeNote={isActiveNote} />
        <div className={styles.wrapperWorkSpace}>
          <Workspace add={addNotice} update={updateNotice} activeNote={isActiveNote}/>
          </div>
      </main>
    </div>
    </NoteContext>
   
  );
}

export default App;
