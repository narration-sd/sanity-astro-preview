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

</style>