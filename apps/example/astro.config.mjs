import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import solid from "@astrojs/solid-js";
import react from "@astrojs/react";
import netlify from '@astrojs/netlify/functions';
import tailwind from "@astrojs/tailwind";

export default defineConfig({

  integrations: [
    vue({
      include: ['**/vue-components/*']
    }),
    solid({
      include: ['**/solid/*']
    }),
    svelte({
      include: ['**/svelte/*']
    }),
    react({
      include: ['**/react/*', 'layouts/PageLayout.tsx']
    }),
    // tailwind()
  ]
  // output: 'server',
  // adapter: netlify(),
});