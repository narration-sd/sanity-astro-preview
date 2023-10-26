import { defineConfig } from 'astro/config';
// import { defineConfig } from 'astro';

import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import solid from "@astrojs/solid-js";
import react from "@astrojs/react";
import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
// https://docs.astro.build/en/guides/content-collections/
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // experimental: {
  //   contentCollections: true,
  // },
  integrations: [
    vue({
      include: ['**/vue-components/*']
    // include[
    //   'components/vue-components/assure.vue-components',
    //   'components/vue-components/AuthroView.vue-components',
    //   'components/vue-components/PreviewSubscription.vue-components',
    //   'components/vue-components/ShareActivities.vue-components',
    // ]
    }),
    solid({
      // this is very necessary, to keep solid integration out of react
      include: ['**/solid/*']
    }),
    svelte({
      include: ['**/svelte/*']
    }),
    react({
      // experimentalReactChildren: true,
      include: ['**/react/*', 'layouts/PageLayout.tsx']
    }),
    // tailwind()
  ]
  // output: 'server',
  // adapter: netlify(),
});