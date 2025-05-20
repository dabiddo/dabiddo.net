---
##layout: ../layouts/Blogpost.astro
title: 'Larabox & Gowizard'
description: "Joining projects for a common goal"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'woking on new backgrounds'
pubDate: 2025-05-20
jpn: '#'
author: 'Dabiddo'
tags: ["vscode", "devcontainers", "golang", "docker","personal"]
---

# Streamlining My Projects: Docker, NodeJS, and GitHub Actions

This past week has been a whirlwind of updates and improvements across my projects. One of the biggest changes was expanding the gowizard project to support more Node.js frameworks, including PayloadCMS, Better-T-Stack, and NestJS.

While setting up these new projects, I realized that repeatedly building on top of the standard Node.js Dockerfile felt inefficient. To solve this, I decided to enhance my larabox Docker image by adding both NPM and PNPM, along with the CLI tools needed for most of my projects. This change means I can now use a single, versatile Docker image for a variety of development environments, saving time and reducing complexity.

This update also gave me a chance to dive deeper into GitHub Actions. Although I’d interacted with them before, I hadn’t created my own workflows from scratch. I took this opportunity to learn and ended up building two key workflows:

   - The first scans for NPM package updates and, when it finds any, automatically creates a pull request for larabox.
    Once those changes are reviewed and merged, a second workflow kicks in to build and push the updated Docker image to my Docker Hub account.

- On the gowizard side, I updated most commands to use the larabox:latest image. Now, when you spin up a new project, you only need to download a single image, rather than switching between Composer and Node images. This makes the setup process much smoother and more efficient.

Most of the projects are running smoothly with these changes. The only exception is refine.dev, which throws errors when using the local larabox installer. For now, I’ve reverted to using the node:alpine image for that particular project.

There’s still some fine-tuning left to do, but overall, the projects are stable and ready for use. I’m excited about these improvements and looking forward to seeing how they streamline development going forward.

## Still to come

I'm still doing updates and refactoring, I think I have found a solution to my Git SSH not working inside Abacus CodeLLM editor, and I'm also testing the official Laravel VSCode Extension, that will help reduce the number of loaded extensions on the PHP/Laravel devcontainer projects.

While I keep the `larabox` project private, you can checkout the [gowizard](https://github.com/dabiddo/gowizard) project and build your own Devcontainer enviroment script.