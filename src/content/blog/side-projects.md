---
##layout: ../layouts/Blogpost.astro
title: 'Side Projects'
description: "Doing some experiments while having fun."
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2025-04-29
jpn: '#'
author: 'Dabiddo'
tags: ["docker","personal","devcontainers"]
---

## Side Projects

This week I had a bit of fun with some side projects, exploring new tools and technologies to enhance my workflow.

For my 1st side project, Its one I never finished and just kept as is, but this week I manage to finishi it and make it public

[SchemaBP](https://github.com/dabiddo/schemabp)

This repo is a Nuxt based project that takes a JSON and generates the Laravel models and migrations.
Its not limited to just laravel, it also does Prisma and Drizzle, but since I primarily used it for laravel, its more polished on that particular module.

You can view and use in this site:

[SchemaBP Live](https://dabiddo.github.io/schemabp/)

## Experiment

For my second side project, I made a little pet project that will serve as a basis to use Laravel + Laravel-Zero side by side.
It uses Laravel-Zero as a queue manager, meaning, the Laravel Framework will create the queue-jobs but Laravel-Zero will handle their execution efficiently.

This side project was just an experiment to see if it was possible to use a micro-framework like Laravel-Zero in conjunction with Laravel for specific tasks.

You can view the project and its details on my GitHub repository.

[lrvlzero-queue](https://github.com/dabiddo/lrvlzero-queue)