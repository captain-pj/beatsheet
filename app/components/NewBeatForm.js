import { useState } from 'react'

export default function AddBeatForm(props) {
    const [name, setTitle] = useState('')
    const [content, setDesc] = useState('')
    const [time, setTime] = useState('')
    const [notes, setNotes] = useState('')
    const [cameraAngle, setCamera] = useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const submitBeat = {
        name,
        time,
        content,
        cameraAngle,
        notes
      }
      try {
        await fetch(`http://localhost:8080/acts/${props.id}/beats`, {
        method: 'POST',
        body: JSON.stringify(submitBeat),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      props.onAdd()
    } catch (error) {
      console.error(error)
    }
    }
    

    return (
      <form onSubmit={handleSubmit} className='container flex flex-col justify-start gap-5 basis-1/4 text-slate-800'>
        <input
          type='text'
          value={name}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={name ? name : 'Enter beat title'}
        />
        <input
          type='text'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder='Enter beat timing or duration'
        />
        <input
          type='text'
          value={content}
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Enter beat description'
        />
        <input
          type='text'
          value={cameraAngle}
          onChange={(e) => setCamera(e.target.value)}
          placeholder='Enter camera angle or shot'
        />
        <input
          type='text'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Any additional notes?'
        />

        <button type='submit' className='bg-emerald-500 p-2 text-slate-100'>Add Beat</button>
      </form>
    )
  }