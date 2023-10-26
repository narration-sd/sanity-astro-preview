<template>
  <h1>SharedActivities!</h1>
    <h4>activity to be shared: {{ settings.activity }}</h4>
</template>

<script>

// This could be done in functional composition, preferred now over
// the v2 renderless component form, then with visual components
// stacked within its slots. In Vue anyway; some looking to see how
// that might be possible with Astro, which might use this or perhaps
// use its own slots ability. How many concepts cross between? A more
// formal point is that with nanostores distributing the data, no
// enclosing is needed. Which again harks back to the Astro questions.

import { ref, onMounted, onUnmounted } from 'vue'
import { eSettings } from '../../store/assurance.ts'
import { useStore } from "@nanostores/vue";

const getFreshActivity = async () => {
  const response = await fetch('https://www.boredapi.com/api/activity')
      .catch (err => { return { error: err } })

  if (response.ok) {
    const json = await response.json()
    return json.activity
  } else {
    return response.error + ' (see browser console)'
  }
}

const shareActivity = async () => {
  const activity = await getFreshActivity()
  eSettings.setKey('activity', activity)
}

export default {
  setup () {
    const settings = ref(useStore(eSettings))
    let intervalId

    onMounted(() => {
      intervalId = setInterval (shareActivity, 2000)
    })

    onUnmounted(() => {
      clearInterval (intervalId)
    })

    return {
      settings
    }
  },
  name: "ShareActivitiesVue"
}
</script>

<style scoped>

</style>