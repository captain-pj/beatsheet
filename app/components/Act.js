import Beat from './Beat'
import NewBeatForm from './NewBeatForm'
import { useState, useEffect, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const Act = ({id, title = 'New Act', onDelete}) => {
  const cancelButtonRef = useRef(null)

  // using state for loading beats, showing the add beat form and for opening the confirmation modal
  const [beats, setBeats] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [open, setOpen] = useState(false)

  // handler for opening the confirm modal before a user deletes an act
    const handleClick = () => {
        setOpen(true)
    }

  //fetch data TODO: break these out into helper functions to make them more reusable
  const fetchFunc = () => {
    fetch(`http://localhost:8080/acts/${id}/beats`)
    .then(data => data.json())
    .then(json => {setBeats(json)})
    .catch(err => console.error(err))
  }

  // display initial data from fetch on page loda
  useEffect(() => {
    fetchFunc()
  }, [id])

  // display form with fields for editing beat
  const handleAddClick = () => {
    setShowForm(true)
  }

 // update beats and hide add beat form 
  const addBeat = () => {
    fetchFunc()
    setShowForm(false)
  }

  const editBeat = () => {
    fetchFunc()
  }

  // logic for removing beat from database
  const deleteBeat = (beatid) => {
    fetch(`http://localhost:8080/acts/${id}/beats/${beatid}`, {
      method: 'DELETE'
    })
    .then(fetchFunc)
    .catch(err => console.error(err))
  }

  return (
    <>
      <section className='p-5 pt-0 w-full min-h-64 mb-5 border-slate-700 border-dashed border-2 rounded prose-stone'>
        <div className='flex justify-between'>
          <h3 className='-ml-5 mt-0 p-3 max-h-12 justify-self-start bg-sky-500/100 text-slate-100 rounded inline-block mb-5'>{title}</h3>
          <button onClick={handleClick} className='justify-self-end border mb-5 rounded border-red-500 text-red-500 p-2 mt-5 prose-sm'>Delete Act</button>
        </div>
            <div className='flex flex-col lg:flex-row flex-wrap justify-start gap-5'>
            {beats.map((beat) => (
              <Beat key={beat.id} id={beat.id} title={beat.name} time={beat.time} desc={beat.content} notes={beat.notes} camera={beat.cameraAngle} onUpdate={editBeat} onDelete={() => deleteBeat(beat.id)} />
            ))}
            {!showForm && <button onClick={handleAddClick} className='border rounded border-emerald-500 text-emerald-500 p-1 pl-3 pr-3 mt-5 prose-sm max-h-9 self-center'>Add Beat</button>}
            {showForm && 
            <div className='max-w-90%'>
              <NewBeatForm id={id} onAdd={addBeat} onCancel={() => setShowForm(false)} />
              <button className='border rounded border-slate-100 text-slate-100 p-1 pl-3 pr-3 p-2 mt-5 prose-sm w-full' onClick={() => setShowForm(false)}>Cancel</button>
            </div>
            }         
          </div>
      </section>


      {open && (
        //TODO: turn this modal code into a reusable component since it is used 
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-10' initialFocus={cancelButtonRef} onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
              </Transition.Child>
      
              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                  >
                    <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                        <div className='sm:flex sm:items-start'>
                          <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                            <ExclamationTriangleIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
                          </div>
                          <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                            <Dialog.Title as='h3' className='text-base font-semibold leading-6 text-gray-900'>
                              Delete act
                            </Dialog.Title>
                            <div className='mt-2'>
                              <p className='text-sm text-gray-500'>
                                Are you sure you want to delete this act? This will also delete all associated beats. This cannot be undone.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                          type='button'
                          className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                          onClick={ onDelete }
                        >
                          Yes, Delete
                        </button>
                        <button
                          type='button'
                          className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        )}
    </>
  )
}
export default Act