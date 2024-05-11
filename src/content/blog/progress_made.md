---
##layout: ../layouts/Blogpost.astro
title: 'Progress made'
description: "updates on vwizard and jlpt project"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2024-05-11
jpn: '#'
author: 'Dabiddo'
tags: ["devcontainers", "docker", "linux", "github", "bash"]
---

Hello!

This week even though I was busy, I managed to make good progress on my personal projects.

First off, for vWizard, I added a new Laravel template that adds MySql-8, I chose this version of MySql because 5.7 seems to have some minor issues with the encoding, and because the template uses the latest laravel, I did not want to go into configuration and re-write files that ar not commonly modified.
I also added "mailhog" to the Laravel template, if you dont know or havent used it, is just a service that acts as an email provider, similar to mailtrap, but for local hosting, its really light weight, I havent used it much, but I added it to my work project a few weeks back for testing some layouts, and I kind like it.

For the JLPT project, I mainly focused on saving the user answers to the quizz, but I also managed to score the quizz, so Im feeling excited because I can now answer the questions and know my overall score.
For the JLPT project, there is still much to do, specially on the questions, I can only render text questions, so I have to find a way to also render some media files like Images and Audio.

That is it for this week.