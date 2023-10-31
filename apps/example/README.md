# Introduction for the `apps/example` app

We've explained some aspects of the development environment in the overall Readme, so let's just jump in to what comes next -- which will be the same for an actual production previewer you would construct.

Combining `turbo` with workspaces, via the top package.json, gains some advantages, with a change or two to be aware of also:

- You can install packages over the entire project of apps and packages simply by doing an `npm install` in the top folder

- Similarly, you can build the entire project including apps and packages by using `npm run build` in the top folder.

- Turbo will cache so that builds only occur where sources have changed

- You still `npm run preview` or `npm run dev` from the app's folder, `/example` in this case

- Due to defined workspaces, npm will now collect installed packages in a top-level `node_modules` folder, except for some small Vite information that the local npm package will need.

- Turbo gives a good speedup much of the time, due to its caching of builds. It also guarantees that everything is up to date, each time.

A few more observations will be added 

### Getting ready to run...

So now you know how to build -- but to actually do so, and run preview or dev, you'd need to provide some things of your own:

- a Sanity project having a dataset with an `author` schema per the one in `/misc` of the `apps/example` source

- an `.env` file in `apps/example` having the permissions from that Sanity project, including a Viewer permission you set up there to allow drafts to be read

- A handy Studio allowing you to edit the Author data. Eventually what you build as live preview pages can be incorporated there, but developing them works well as stand-alone outside, as we are doing here.

With these in place, you could put the Studio and the app up in side-by-side windows, watch the preview update as you type or change image or list settings.

To run the preview demo, use `npm run dev` or `npm run preview` depending on whether you've built, and select the **_React Preview with Kit_** button at the top of the page.

There's a movie available on Slack, [here](https://sanity-io-land.slack.com/archives/C04B7GG8YNQ/p1698305553712789), to see how this would appear and operate, before you might work up this example yourself.

## islands-nanostores demo

This is self-sufficient, and will appear in the built app on the opening page.

- use buttons to update from each component, observing the others

- observe the updating every two seconds from a free open api

- what you've last set on the buttons will be preserved over restarts of the app, demonstrating communicated data persistence when enabled.