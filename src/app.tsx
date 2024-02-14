import { ChangeEvent, useState } from 'react'
import logo from './Logologo-nlw.svg'
import { NoteCard } from './components/note-cards'
import { NewNoteCard } from './new-note-card'

interface Note  {
   id: string,
   date: Date,
   content: string
}
 export function App() {
      const [search, setSearch] = useState('')
      const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem('notes') || '[]'))   
      

   function onNoteCreated(content: string) {
      const newNote = {
         id: crypto.randomUUID(),
         date: new Date(),
         content,
      }
      const notesArray = [newNote, ...notes]

      setNotes(notesArray)

      localStorage.setItem('notes', JSON.stringify(notesArray))
   }

   
   function handleSearch(event: ChangeEvent<HTMLInputElement>) {
      const query = event.target.value

      setSearch(query)
   }
   const filteredNotes = search !== ''
      ? notes.filter((note) => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      
      : notes;

  return <div className='mx-auto max-w-6xl my-12 space-y-6'>
            <img src={ logo } alt="logo do nlw" />

            <form className='w-full mt-6'>
               <input type="text" placeholder='Busque suas notas...' className='w-full bg-transparent text-3xl font-semibold  outline-none tracking-tight placeholder:text-slate-500' onChange={handleSearch}/>
            </form>

            <div className='h-px bg-slate-700' />

            <div className='grid grid-cols-3  gap-6 auto-rows-[250px] '>
            <NewNoteCard onNoteCreated={onNoteCreated}/>
            {filteredNotes.map((note) => {
                  return (
                   <NoteCard  key={note.id} note={note} />
                  );
               })}
         </div>

  
</div>
}


