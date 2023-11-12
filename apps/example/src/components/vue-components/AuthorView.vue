<script setup lang="ts">
import { computed, ref } from 'vue'

import {ePreviewData, type PreviewType} from '@narration-sd/sanity-astro-preview'
import {useStore} from '@nanostores/vue'

import SanityPortableText from './SanityPortableText.vue'
import { imageUrl, formatBlogPostDate } from '../../utils/helpers'

// n.b. we use a usual v3 reactive form to get pageData and loading,
// because Vue doesn't have an alias form so that previewData
// could be returned as pageData withing a destructurimg
const pageDataRef = ref(useStore(ePreviewData as PreviewType))
const pageData = computed(() => {
  return pageDataRef.value.previewData
})
const loading = computed(() => {
  return pageDataRef.value.loading ? '(connecting...)' : ''
})

</script>

<template>
  <div v-if="pageData.slug">
    <article>
      <h2>Author Live (Vue) {{ loading }}</h2>
      <div class="theAuthor-block">
        <div class="theAuthor-row">
          <img class="theAuthor-main__img" loading="lazy"
               :src="imageUrl(pageData, 360)"/>
          <h3>{{ pageData.name }}</h3>
        </div>
      </div>
      <a href="{`/theAuthor/${pageData.slug.current}`}">
        {{
          ((pageData?._originalId).indexOf('drafts.') >= 0)
            ? 'Draft: ' : 'Published: '
        }}
      </a>
      <time class="publish-date">
        {{ formatBlogPostDate(pageData._updatedAt) }}
      </time>
      <h2>Bio</h2>
      <div class="bio">
        <SanityPortableText :value="pageData.bio"/>
      </div>
      <h3> Contacts</h3>
      <div v-for="contact in pageData.contacts">
        <p class="contact">&nbsp;&nbsp;{{ contact }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: darkred;
  text-decoration: underline;
}

.theAuthor-block {
  display: flex;
  flex-columns: 2;
  flex-direction: column;
  text-align: center;
  width: 250px;
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
.bio {
  padding-left: 10px;
}
.contact {
  margin-bottom: 0.25rem;
}

.theAuthor-main__img {
  width: 100%;
  max-width: 120px;
  height: auto;
  margin-bottom: 1rem;
}

.title,
.theAuthor,
.publish-date {
  margin: 0;
}

.publish-date,
.theAuthor {
  font-size: 1.25rem;
  /*
  color: var(--theme-text-lighter);
  */
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
  /*
  color: var(--theme-text);
  */
}

</style>