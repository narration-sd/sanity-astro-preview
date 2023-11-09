<template>
  <h3>{{ title }}</h3>
  <div v-for="item in list">
    <p class="list-item">{{ item }}</p>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  title:String,
  list:Array
})

</script>

<style scoped>

.list-item {
  margin-left: 10px;
  margin-bottom: 0.25rem;
}

</style>