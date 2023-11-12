<template>
  <h2 v-if="title" class="title">{{ title }}</h2>
  <div class="text">
    <SanityPortableText :value="content"/>
  </div>
</template>

<script setup lang="ts">
import SanityPortableText from './SanityPortableText.vue'

const props = defineProps({
  title:String,
  content:Object
})
</script>

<style scoped>

.text {
  margin-left: 10px;
}

</style>