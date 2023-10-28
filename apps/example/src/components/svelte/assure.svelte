<script>
// svelte is a little different -- no useStore() but $ hooks events
import { eSettings } from '../../store/assurance.ts'

const assure = (status, event) => {
  eSettings.setKey('assurance', status)
  console.log ('event properties: ' + JSON.stringify(event))
}
</script>

<div>
<h2 class="subtitle">Then from Svelte...</h2>
    <h2>Does Svelte feel assured? It seems { $eSettings.assurance }</h2>
    <h4>my activity is: { $eSettings.activity }</h4>
    <button on:click={(event) => assure("in question", event)}>Question it</button>
    <button on:click={ (event) => assure('assured', event) }>Be Assured</button>
    <button on:click={ (event) => assure('not assured...', event) }>Unassure it</button>
</div>

<style>
.subtitle {
    color: darkgray;
}
</style>