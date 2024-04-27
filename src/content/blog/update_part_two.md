---
##layout: ../layouts/Blogpost.astro
title: 'Project Update Part 2'
description: "vwizard and other updates"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2024-04-27
jpn: '#'
author: 'Dabiddo'
tags: ["devcontainers", "docker", "linux", "github", "bash"]
--- 

Hello 

This has been a busy week between my 9-5 and personal projects, I barely had any time to sleep.

This week I worked on my JLPT app, a few months a go, I stumbled upon this link for a [quizz app](https://digitaliser.getmarked.ai/docs/api/question_schema/), I really liked their JSON schema, and so I took that schema for my JLPT quizz application that I'm doing, and although that schema has a lot of information that I don't use, I will just exchange it for other information that I will use.

From my previous update, I also worked on `vwizard` I added the one-liner to create a `Rust` devcontainer, that is already on the `main` branch, but if you go to the `dev` branch, I have also added Nuxt one-liners.

Next to the VWizard, I also created the VMaker, which is the succesor of the `maker` script, this new VMaker will help turn existing project directories to devcontainers, based on the same templates used in vwizard, since all the templates are on `stub` files, they can be re-used by other scripts.
I created this VMaker script to help turn existing projects I use at my job to devcontainers, without me having to check my blog for the tutorials.

That is it for this week, hope to have more updates next week as well.

