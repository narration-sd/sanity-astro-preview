# sanity-astro-preview

# An archive only, please...

I've left this up for politeness, but development is very advanced past this point, so please don't use this codebase for anything now.

The next revision will offer a lot -- let's say leadnig with much simpler ways of working with your Astro pages as they are -- and an already nicely running implementaton for you of Sanity's Presentation, click-to-instant Live Preview editing...

Until then, then :)

## Published

The package this repo includes and is based on has now been published on NpmJs, so you can install it directly in your projects.

There's a [Guides, Reference, and Faqs site](https://encounsel.com/docs) which will probably be most helpful in using it.

Readmes here will catch up, including this one(!)

## Introduction

The `@narration-sd/sanity-astro-preview` package implements Sanity's `preview-kit` so that it can be used easily with any of the development frameworks Astro presently makes available, such as React, VueJs, Svelte, Solid, etc..

It does this by delivering preview data to chosen Astro islands via Nanostoress, from its own React component.

You simply include the visually silent subscription component with your viewing component, in an Astro page.

Your viewer coding needs only to include a single line to gain the previews, which reactively follow Sanity Data Lake updates, as editing drafts in Studio immediately provides.

## Package and Demo project

The overall project uses npm's recent ability to run a (built and generated) package from its folder locally, by defining the version as "*" in package.json. So we don't need to actually have ir published, to include it initially.

The structure with /apps and /packages is used so that Turborepo can operate, and you'll find some advantages of this in the Readme for the apps/example.

## Development Demo app

React is the apparent first interest in community just now, so its demo page in the `apps/example` is a pretty clean if simple illustration, using the package.

VueJs is also a great framework to use with Astro, and there's an identical-abilities page ro it also.

Both of these illustrate the first, simplest conversion pattern [suggested on the docs site](https://encounsel.com/docs/faqs/50-making-it-easy/), which goes nicely step-by-step. 

There will soon also be examples of the efficient and just as simple `components-in-component` way to do this.

Operating the demo should be self-evident, as it will simply show a quietly-formatted page having the contents of the Author schema, including text, an adjustable image, a list selector, and a Portable Text bio.

## islands-nanostores demo

On its brief top-line menu, the app also includes the Nanostores Demo, an original validation from months ago which has multiple types of Astro islands communicating together. Here you can demonstrate by using the buttons. 

It shows offline data persistence when you restart, and you'll also notice dynamic data events arriving from outside.

# Documentation

There's now the beginning of a full Guides and Referencs documentation site, including Search, available online at [https://encounsel.com/docs](https://encounsel.com/docs).

You can also look locally for information in the apps and packages folders.

package:  https://github.com/narration-sd/sanity-astro-preview/blob/main/packages/sanity-astro-preview/README.md

example app: https://github.com/narration-sd/sanity-astro-preview/blob/main/apps/example/README.md
