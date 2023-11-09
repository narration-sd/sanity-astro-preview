<script setup lang="ts">
import {computed, ref} from 'vue'

import {ePreviewData, type PreviewType} from '@narration-sd/sanity-astro-preview'
import {useStore} from '@nanostores/vue'
import RowCaptionSlotBlock from "./RowCaptionSlotBlock.vue"
import SanityImageBlock from "./SanityImageBlock.vue"
import PageStatusDateBlock from "./PageStatusDateBlock.vue"
import PortableTextBlock from "./PortableTextBlock.vue"
import TextListBlock from "./TextListBlock.vue"
import LivePageHeading from "./LivePageHeading.vue"

// n.b. we use a usual v3 reactive form to get pageData and loading,
// because Vue doesn't have an alias form so that previewData
// could be returned as pageData withing a destructurimg
const pageDataRef = ref(useStore(ePreviewData as PreviewType))
const pageData = computed(() => {
  return pageDataRef.value.previewData
})
const connection = computed(() => {
  return pageDataRef.value.loading ? '(connecting...)' : ''
})

</script>

<template>
  <article>
    <LivePageHeading title="Author Live Blocks (Vue)" :msg="connection"/>
    <RowCaptionSlotBlock :name="pageData.name">
      <SanityImageBlock :imageObject="pageData.image" :pipelineWidth="200"/>
    </RowCaptionSlotBlock>
    <PageStatusDateBlock :pageData="pageData"/>
    <PortableTextBlock title="Bio" :content="pageData.bio"/>
    <TextListBlock title="Contacts" :list="pageData.contacts"/>
  </article>
</template>

<style scoped>

:deep(.image-style) {  /* Vue 3 magic so child will override using this */
  width: 100%;
  max-width: 130px;
  height: auto;
  margin-bottom: 1rem;
}

</style>