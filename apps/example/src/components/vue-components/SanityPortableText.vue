<template>
  <div>
<!--    <h2>SPT Text</h2>-->
<!--    <h4>(unresolved jsx formatter, so nothing yet...)</h4>-->
    <div v-html="theHtml"></div>
  </div>
</template>

<script>

import { sanityPortableText } from "../../lib/sanityPortableText";
import { toRefs, computed, Fragment } from 'vue'
export default {
  setup(props) {

    const { value } =  toRefs(props)
    const theHtml = computed (() => {
      const htmlText = sanityPortableText(value.value)
      return htmlText
    })
    return { theHtml }
  },
  name: "SanityPortableText",
  props: {
    value:Object,
  },
  components: {
    Fragment
  }
}
</script>

<style scoped>

</style>