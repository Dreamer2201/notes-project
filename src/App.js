import './App.css';
import { useState, useEffect } from 'react';
import NoteContext from './context'
import SearchBox from './components/SearchBox/SearchBox'
import Sidebar from './components/Sidebar/Sidebar'
import Workspace from './components/Workspace/Workspace'

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
    console.log('Success')
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
      console.log('I am work')
      console.log(queryWord)
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
      console.log('note added')
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
        console.log('note updated')
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
        console.log('note deleted')
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
      console.log(value)
      setQueryWord(value);
    }


  const filterNotesByQuery = () => {
    if(!queryWord) {
      return notices
    }
    const queryNormolaze = queryWord.toLocaleLowerCase();

    const filterNotes = notices.filter(item => item.text.toLocaleLowerCase().includes(queryNormolaze))
    console.log(filterNotes)
    return filterNotes
  }
  const filterNotes = filterNotesByQuery()

    const IsActiveNote = (note) => {
      setIsActiveNote(note)
    }

    const isNotes = notices.length

  return (
    <NoteContext value={isActiveNote} >
       <div className="App">
      <header className="App-header">
        <SearchBox removeNote={deleteNote} activeNote={isActiveNote} add={addNotice} searchNotes={handleChangeFilter} />
      </header>
      <main className='App-main'>
        <Sidebar notes={filterNotes} setActive={IsActiveNote} activeNote={isActiveNote} />
        <div className="wrapperWorkSpace">
          <Workspace add={addNotice} update={updateNotice} activeNote={isActiveNote}/>
          </div>
      </main>
    </div>
    </NoteContext>
   
  );
}

export default App;
