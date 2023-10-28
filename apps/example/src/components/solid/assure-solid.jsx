import { useStore } from '@nanostores/solid'
import { eSettings } from '../../store/assurance.ts'
import '../../styles/assure-react-solid.css'

const settings = useStore(eSettings)

const assureSolid = (status, event) => {
  // simplest way, with no checking -- and at this stage, Typescript isn't finding the issue placed...
  eSettings.setKey('assurance', status)
  // for the moment, see about the event pass from square bracket notation
  // from: https://www.solidjs.com/tutorial/bindings_events
  // because: the ts isn't matching this so faar, though it only warns
  console.log ('event properties: ' + JSON.stringify(event))
  // which works, so we'll use that at least for questioning, rest to approved normal form
}

export default function AssureSo() {
  return <div>
    <h2 className="subtitle">Ok, and Solid, reactively supposed...</h2>
    <h2>Our Solid assurance is:  {settings().assurance}</h2>
    <h4>Our Solid activity is:  {settings().activity}</h4>
    <button onClick={[assureSolid, 'in question']}>Question it</button>
    <button onClick={ (event) => assureSolid('assured', event) }>Be Assured</button>
    <button onClick={ (event) => assureSolid('not assured...', event) }>Unassure it</button>
  </div>
}
