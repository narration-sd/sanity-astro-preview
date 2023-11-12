<template>
  <div v-html="theHtml"></div>
</template>

<script lang="ts">
import { sanityPortableText } from "../../lib/sanityPortableText";
import { toRefs, computed } from 'vue'

export default {
  setup(props) {
    const { value } =  toRefs(props)
    const theHtml = computed (() => {
      return sanityPortableText(value.value)
    })
    return { theHtml }
  },
  name: "SanityPortableText",
  props: {
    value:Object,
  },
}
</script>

<style scoped>

</style>