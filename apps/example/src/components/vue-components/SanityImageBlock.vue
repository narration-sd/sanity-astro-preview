<template>
  <div v-if="!errReported">
    <img class="image-style" loading="lazy"
         :src="imageUrl(imageObject)"/>
  </div>
  <div v-else>
    <h3 class="warn">{{ errReported }}</h3>
  </div>
</template>

<script setup lang="ts">

import {onBeforeMount} from "vue";
import { imageUrl } from "../../utils/helpers"

const props = defineProps({
  imageObject:Object,
  pipelineWidth:Number
})

let errReported = null

onBeforeMount(() => {
  if (!props.pipelineWidth) {
    const msg = 'SanityImage: you need to provide a pipelineWidth prop ' +
      'to set size on the Sanity image pipeline...'
    console.error(msg)
    errReported = msg
  }
})

</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

.image-style {
  width: 100%;
  max-width: 50px;
  height: auto;
  margin-bottom: 1rem;
}

.warn {
  color: darkred;
}

</style>