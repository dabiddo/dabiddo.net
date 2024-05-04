---
##layout: ../layouts/Blogpost.astro
title: 'Vwizard Update'
description: "vwizard and other updates"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2024-05-04
jpn: '#'
author: 'Dabiddo'
tags: ["devcontainers", "docker", "linux", "github", "bash"]
---

This has been an interesting week.

Since I had a day off last wednesday, I did some house chores and also updated the `vwizard` command with some interesting stuff.

First off, I was having some issues getting NPM on the Laravel Dockerfile, I thought of installing NVM, but the `postCreateCommand` on the devcontainer kept failing, so I removed it, just leaving NVM installed on the Dockerfile, but while doint the `Rust` template, I saw the devcontainer `features` and remembered that I could use it to install Node on the Image, thanks to the [features gallery](https://containers.dev/features), that worked like a charm and the new `Laravel` template makes use of the Node Feature to install both NVM and `Nodejs-lts` when building the image, I tried doing the same with `composer`, but that devcontainer feature kept failing, so I install it on the Dockerfile instead.

For the `Rust` I just re-use the one from Microsoft, I haven't used it much to make my own yet.

For `NestJs` and `Nuxt` I settled on re-using the Alpine based NodeJs image, that seems to be working at the moment, I might have to change to a `debian` based once I add the database templates.
Also for `NestJs` I'm using a new command to create the project that I picked up from when I learned how to make a [PNPM Monorepo with NesJs](https://www.tomray.dev/nestjs-nextjs-trpc)

If I remember corretly, I already pushed all these changes to the `main` branch, you chan [visit the repo](https://github.com/dabiddo/containerwizard) and make use of the new changes.

For my 2nd Project about the JLPT, I think I have it at 70% of what I think will be the MVP, having make use of the Quizz schema really made things easier to understand and implement, what I'm struggling a bit is with Livewire, since I'm more of a backend developer, having to work on Frontend work is a new change in pace, but I think I'm doing OK, at least I have it working.
For the most part, I'm using Mary-ui, but I had to add Livewire-Quill which looks a bit weird because my CSS knowledge is pretty limited I haven't been able to make the WYSIWYG editor to look as nicely as the other parts that are using DaisyUi for the styling.

As you see, I've been busy, and will continue to be a bit busy with other things I have going on right now, but will try to make time to keep updating my projects.