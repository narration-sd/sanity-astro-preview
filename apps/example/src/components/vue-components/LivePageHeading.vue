<template>
  <h2 class="title">{{ title }} {{ msg }}</h2>
</template>
<script setup lang="ts">

const props = defineProps({
  title:String,
  msg:{
    type:String,
    default: ''
  }
})
</script>

<style scoped>

:deep(.image-style) { /* Vue 3 magic so child will use this */
  width: 100%;
  max-width: 130px;
  height: auto;
  margin-bottom: 1rem;
}

</style>