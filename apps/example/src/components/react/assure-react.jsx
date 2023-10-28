import React, { useState, useEffect } from 'react'
import { useStore } from '@nanostores/react'
import { eSettings } from '../../store/assurance.ts'
import '../../styles/assure-react-solid.css'


const assureReact = (status, event) => {
  eSettings.setKey('assurance', status)
  // just a portion, as stringifying event in React gets cirdular
  console.log ('event type: ' + event.type)
}

export default function AssureR() {

  const [ assurance, setAsssurance ] = useState ("whatassure")
  const [ activity, setActivity ] = useState ("nada")
  const settings = useStore(eSettings)

  useEffect ( () => {
    setAsssurance(settings.assurance)
    setActivity(settings.activity)
  })

  return <div>
    <h2 className="subtitle">Ok, and React, not simple like Solid...</h2>
    <h2>Our React assurance would be:  {assurance}</h2>
    <h4>Our react activity is:  {activity}</h4>
    <button onClick={(event) => { assureReact('in question', event)}}>Question it</button>
    <button onClick={ (event) => { assureReact('assured', event)}}>Be Assured</button>
    <button onClick={(event ) => { assureReact('not assured', event)}}>Unassure it</button>
  </div>
}
