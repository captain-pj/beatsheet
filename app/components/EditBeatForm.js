import { useState, useEffect } from 'react'

export default function EditBeatForm(props) {
    const [name, setName] = useState(props.title || '')
    const [content, setContent] = useState(props.desc || '')
    const [time, setTime] = useState(props.time || '')
    const [notes, setNotes] = useState(props.notes || '')
    const [cameraAngle, setCameraAngle] = useState(props.camera || '')

    useEffect(() => {
      setName(props.title || '')
      setContent(props.desc || '')
      setTime(props.time || '')
      setNotes(props.notes || '')
      setCameraAngle(props.camera || '')
    }, [props.title, props.desc, props.time, props.notes, props.camera])
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const submitBeat = {
        name: name || props.title,
        time: time || props.time,
        content: content || props.desc,
        cameraAngle: cameraAngle || props.camera,
        notes: notes || props.notes
      }
      try {
        await fetch(`http://localhost:8080/acts/beats/${props.id}`, {
        method: 'PUT',
        body: JSON.stringify(submitBeat),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      props.onUpdate()
    } catch (error) {
      console.error(error)
    }
    }

    return (
      <form key={props.id} onSubmit={handleSubmit} className='container flex flex-col justify-start gap-5 basis-1/4 text-slate-800'>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={props.title ? props.title : 'Enter beat title'}
        />
        <input
          type='text'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder={props.time ? props.time : 'Enter beat time'}
        />
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={props.desc ? props.desc : 'Enter beat description'}
        />
        <input
          type='text'
          value={cameraAngle}
          onChange={(e) => setCameraAngle(e.target.value)}
          placeholder={props.camera ? props.camera : 'Enter camera angle or shot'}
        />
        <input
          type='text'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={props.notes ? props.notes : 'Any additional notes?'}
        />

        <button type='submit' className='prose-sm rounded bg-emerald-500 p-2 text-slate-100'>Update Beat</button>
      </form>
    )
  }