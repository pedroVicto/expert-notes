import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps   {
    onNoteCreated: (content: string) => void
}

export function NewNoteCard({onNoteCreated}: NewNoteCardProps) {
    const [shouldShowOnBoarding, setShouldOnboarding] = useState(true)
    const [isRecording] = useState(false)
    const [content, setContent] = useState('')

    function handleStartEditor() {
        setShouldOnboarding(false)
    }

    function handleContentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)
        
        if(event.target.value === ''){
            setShouldOnboarding(true)
        }
    }

    function handleSaveNote(event: FormEvent) {
        event.preventDefault()
        onNoteCreated(content)

        setContent('')

        setShouldOnboarding(true)

        toast.success('nota criada com sucesso! ✔️')
    }

    

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md flex flex-col bg-slate-700 text-left p-5 gap-5'>
                <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                <p className='text-sm leading-6 text-slate-500'>Grave uma nota em áudio para ser convertida em texto</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
                <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh]  bg-slate-700 rounded-md flex flex-col outline-none'>
                    <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400'>
                        <X className='size-5 hover:text-slate-100'/>
                    </Dialog.Close>

                    <form onSubmit={handleSaveNote} className='flex-1 flex flex-col'>

                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-sm font-medium text-slate-300'>Adicionar nota</span>
                            {shouldShowOnBoarding ? (
                                <p className='text-sm leading-6 text-slate-500'>Comece <button onClick={handleStartEditor} className='text-lime-400 hover:underline' type='button'>escrevendo texto sua nota aqui</button></p>

                            ) : (
                                <textarea autoFocus placeholder='digite suas anotações aqui' className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' onChange={handleContentChange} value={content}/>
                            )
                        }
                        </div>
                        
                        {isRecording ? (
                            <button type='button'  className='w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-300'>Gravando!(clique para interromper)</button>

                        ) : (
                            <button type='submit' className='w-full bg-lime-600 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'>Salvar nota</button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
         
    )
}

