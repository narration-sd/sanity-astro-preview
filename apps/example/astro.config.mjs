import { defineConfig } from 'astro/config';
import { sanityIntegration } from "@sanity/astro";
import 'sanity'

import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import solid from "@astrojs/solid-js";
import react from "@astrojs/react";
import netlify from '@astrojs/netlify/functions';
import tailwind from "@astrojs/tailwind";

import { clientConfig, kitConfig } from "./previewKitConfig";

const integrationConfig =
  kitConfig.isLive && kitConfig.perspective
    ? Object.assign(clientConfig, {
      perspective: kitConfig?.perspective,
      useCdn: false, // so our images can edit rapidly
    })
    : clientConfig

export default defineConfig({
  integrations: [

    sanityIntegration(integrationConfig),
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
  ],
  output: kitConfig.staticServer === 'true' ? 'static' : 'hybrid',
  adapter: netlify(),
});