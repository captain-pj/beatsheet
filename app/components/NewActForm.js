import { useState, useRef } from 'react'

export default function AddActForm({ onAdd }) {
    const dataRef = useRef()
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const submitAct = {
          name: title
        }
        try { 
         await fetch(`http://localhost:8080/acts/`, {
          method: 'POST',
          body: JSON.stringify(submitAct),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        onAdd()
        } catch (error) {
            console.error(error)
        }
      }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          className='mr-5 text-slate-800'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter Act Title'
        />
        <button type='submit'>Add Act</button>
      </form>
    )
  }