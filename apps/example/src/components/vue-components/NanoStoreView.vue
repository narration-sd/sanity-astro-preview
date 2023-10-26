<script setup lang="ts">
import SubscriptionsProvider from "./retiring/SubscriptionsProvider.vue-components";
const data = {
  name: 'Bill',
}

</script>

<template>
  <div>
    <h2>NanostoreView</h2>
      <SubscriptionsProvider
          v-slot="{ data, settings, author, post, dynauth }"
      >
        <h2>My name is {{ data?.name }}, isn't it</h2>
        <h3>Data is: {{ JSON.stringify(data) }}</h3>
        <h3>Settings are: {{ JSON.stringify(settings) }}</h3>
        <h3>Author: {{ JSON.stringify(author) }}</h3>
        <h3>Post: {{ JSON.stringify(post) }}</h3>
        <h3>DynAuth: {{ JSON.stringify(dynauth) }}</h3>
      </SubscriptionsProvider>
  </div>
</template>

<style scoped>

</style>