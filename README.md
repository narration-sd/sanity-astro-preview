# sanity-astro-preview

## Preface

There needs to be one for the moment, as this is all a first pass. Develompent is still under way, and will try to be responsive to comments. 

There are also a few <preview-kit> configurations not yet fully implemented, and a bit more refactoring to be done around the internal libraries which will include supporting them.

However, what's presented today works, and works well, fully equivalent to earlier `groq-store` use, and with all `preview-kit`'s advantages, which has been the goal.

## Introduction

The `@narration-sd/sanity-astro-preview` package implements Sanity's `preview-kit` so that it can be used easily with any of the development frameworks Astro makes available, such as React, VueJs, Svelte, Solid, etc..

It does this by delivering preview data to chosen Astro islands via Nanostoress, from its own React component. 

You simply include the visually silent component with your viewing component in an Astro page. The viewer needs only to include a single line to gain the previews, which reactively follow Sanity Data Lake updates that editing drafts in Studio make.

## Package and Demo project

The overall project uses npm's recent ability to run a (built and generated) package from its folder locally, by defining the version as "*" in package.json. So we don't need to actually have ir published, to include it initially.

The structure with /apps and /packages is used so that Turborepo can operate, and you'll find some advantages of this in the Readme for the apps/example.

## Development Demo app

React is the apparent first interest in community just now, so its demo app is a pretty clean version, using the package.

There's actually a VueJs alternate already running, which this preview system basis was developed on, and it will be included later once updated to use the package. Possibly a Svelte page will arrive also, a bit later.

Operating the demo should be self-evident, as it will simply show a simply-formatted page having the contents of the Author schema, including text, an adjustable image, a list selector, and a Portable Text bio.

## islands-nanostores demo

On its simple top-line menu, the app also includes the Nanostores Demo, an original validation from months ago which has multiple types of Astro islands communicating together, which you can demonstrate by using the buttons. 

It shows offline data persistence when you restart, and you'll also notice dynamic data events arriving from outside.

# Documentation

Fimd this in the apps and packages folders, including appropriate source takeouts.

package:  https://github.com/narration-sd/sanity-astro-preview/blob/main/README.md

app: https://github.com/narration-sd/sanity-astro-preview/blob/main/apps/example/README.md