<template>
  <div>
    <h2 class="subtitle">Firstly with Vue,</h2>
    <h2>Assurance is...{{ settings.assurance }}</h2>
    <h4>Activity is...{{ settings.activity }}</h4>
    <button name="Question" @click="questionIt">Question it...</button>
    <button name="Assure" @click="beAssured">Be Assured...</button>
    <button name="Unassure" @click="unAssure">Unassure it...</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from '@nanostores/vue'
import { eSettings } from '../../store/assurance.ts'

export default {
  setup() {
    const settings = ref(useStore(eSettings)) // ref(eSettings)
    return {
      settings,
    }
  },
  name: "assure",
  props: {
    class: { type: String, default: 'what is this class for?'}
  },
  methods: {
    questionIt: function (event) { // just don't lose this by => way
      if (event) {
        console.log ('eventful: ' + JSON.stringify(event))
        console.log('event: ' + event.target.tagName)
      }
      eSettings.setKey('assurance', 'in question')
    },
    beAssured (event) {
      if (event) {
        console.log ('eventful: ' + JSON.stringify(event))
        console.log('event: ' + event.target.tagName)
      }
      eSettings.setKey('assurance', 'assured!')
    },
    unAssure: function (event) {
      if (event) {
        console.log ('eventful: ' + JSON.stringify(event))
        console.log('event: ' + event.target.tagName)
      }
      eSettings.setKey('assurance', 'not assured')
    }
  }
}
</script>

<style scoped>
.subtitle {
  color: darkgray;
}
</style>