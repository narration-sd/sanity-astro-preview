<template>
  <h2 v-if="title">{{ title }}</h2>
  <div class="title">
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

.title {
  padding-left: 10px;
}

</style>