"use client"
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import Act from './components/Act'
import NewActForm from './components/NewActForm'

const Home = () => {

  const [acts, setActs] = useState([])
  const [showForm, setShowForm] = useState(false)

  // TODO: make common helper functions and move/make modular to avoid duplication
  const fetchFunc = () => {
    fetch(`http://localhost:8080/acts/`)
    .then(data => data.json())
    .then(json => {setActs(json)})
    .catch(err => console.error(err))
  }

  // initial load of acts

  useEffect(() => {
    fetchFunc()
  }, [])

  const addAct = useCallback((title) => {
      fetchFunc()
      setShowForm(false)
    },
    [acts]
  )

  const deleteAct = useCallback((id) => {
    fetch(`http://localhost:8080/acts/${id}`, {
      method: 'DELETE'
    })
    .then(fetchFunc)
    .catch(err => console.error(err))
  }
  )

  const handleAddClick = useCallback(() => {
    setShowForm(true);
  }, [])

  return (
    <main className="bg-slate-800 text-slate-100 flex w-full min-h-screen flex-col p-10">
      <div className="left-0 flex h-64 w-full items-end justify-between basis-full">
        <a
          className="pointer-events-none flex mb-5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/spotter.svg"
            alt="Spotter Logo"
            className="mr-3 invert"
            width={100}
            height={24}
            priority
          />
          Beatsheet Helper
        </a>
      </div>
      <div className="left-0 flex h-64 w-full mb-5 items-end justify-start basis-full">
        <p className="flex left-0 prose-sm">Use this layout to plan out the major beats or moments in your video. Add acts and add beats into those acts.</p>
      </div>
      <div>
        {acts && acts.map((act) => (
           <Act key={act.id} id={act.id} title={act.name} onDelete={() => deleteAct(act.id)} />
        ))}
         {!showForm && <button onClick={handleAddClick} className='border rounded border-emerald-500 text-emerald-500 p-1 mt-5 prose-sm'>Add Act</button>}
        {showForm && <NewActForm onAdd={addAct} onCancel={() => setShowForm(false)} />}
      </div>
    </main>
  )
}

export default Home
