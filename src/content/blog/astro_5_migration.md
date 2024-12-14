---
##layout: ../layouts/Blogpost.astro
title: 'Astro 5 migration'
description: "migrated to astro 5, clean slate"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2024-12-14
jpn: '#'
author: 'Dabiddo'
tags: ["astro","personal","blog"]
---

### Checking for changes

Last week, while I was out of town, Astro 5 was released, while in the hotel, I did a bit of testing to see if the migration was gonna be as easy as to when I migrated to v4, but I got a notification of some breaking changes, not wanting to risk it, I did not migrated until today.

### Clean slate migration

Because I knew there where gonna be some breaking changes, I decided to do a clean-slate migration, I basically created an empty Astro-5 blog project, and replaced all my md files, and then deleted my current v4 files to replace them with the V5 files and directories, this generated some issues, but after cleaning and fixing them I was able to see my blog posts.

### Layouts

Once I was able to see my blog posts with the default V5 layouts, I started on migrating my own layouts that use `terminal-css` It was a lot easier and simple with the new Astro 5 content, I did not had to fight the the old frontmatter metadata, and migrating the pagination functions was also very easy.


### Hoping

Because I am now running from a fresh Astro 5 template, future migrations should not cause any issues, but I will still be on the lookout for any migrated bugs I might have caused.