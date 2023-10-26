import { useStore } from '@nanostores/solid'
import { eSettings } from '../../store/assurance.ts'
import '../../styles/assure-solid.css'

const settings = useStore(eSettings)

const assure = (status, event) => {
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
    <h2 class="subtitle">Ok, and Solid, reactively supposed...</h2>
    <h2>Our solid assurance is:  {settings().assurance}</h2>
    <h4>Our solid activity is:  {settings().activity}</h4>
    <button onClick={[assure, 'in question']}>Question it</button>
    <button onClick={ (event) => assure('assured', event) }>Be Assured</button>
    <button onClick={ (event) => assure('not assured...', event) }>Unassure it</button>
  </div>
}
