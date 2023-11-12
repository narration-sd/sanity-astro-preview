<template>
  <div class="theAuthor-block">
    <div class="theAuthor-row">
      <slot />
      <h3 class="title">{{ name }}</h3>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name:String,
})
</script>

<style scoped>

a {
  color: inherit;
  text-decoration: none;
}

.theAuthor-block {
  display: flex;
  flex-columns: 2;
  flex-direction: column;
  text-align: center;
  width: 270px;
}

.theAuthor-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  line-height: 1;
  width: 100%;
}

:deep(.image-style) { /* Vue 3 magic so child will use this */
  width: 100%;
  max-width: 130px;
  height: auto;
  margin-bottom: 1rem;
}

</style>