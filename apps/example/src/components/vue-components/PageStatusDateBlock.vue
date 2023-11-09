<template>
  <div v-if="pageData.slug">
    <a href="/theAuthor/{{props.pageData?.slug.current}}">
      {{
        ((props.pageData?._originalId).indexOf('drafts.') >= 0)
          ? 'Draft: ' : 'Published: '
      }}
    </a>
    <time class="publish-date">
      {{ formatBlogPostDate(props.pageData._updatedAt) }}
    </time>
  </div>
</template>

<script setup lang="ts">
// *todo* works, but more to clean up on this one
import { formatBlogPostDate } from '../../utils/helpers'

const props = defineProps({
  pageData: { // we need to be more precise here, because of direct ts use
    type: Object,
    default: {}
  }
})

// console.log('dateblock pageData: ' + JSON.stringify(props.pageData))

</script>

<style scoped>

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: darkred;
  text-decoration: underline;
}

</style>