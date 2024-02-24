---
##layout: ../layouts/Blogpost.astro
title: 'Devpod Round 3'
description: "Weird issue with devpod and VSCode Browser"
image:
    url: 'https://media.publit.io/file/devpod_sh.png' 
    alt: 'devpod.sh'
pubDate: 2023-08-26
jpn: '#'
author: 'Dabiddo'
tags: ["vscode", "devcontainers", "devpod", "docker"]
--- 
 
As stated in previous posts, I'm on the lookout for a new job, this week I had an interview for a job, and got a take-home code challenge, the interviewer said I could use Docker for the deliverable, so I thought it would be a good idea to use `devpod` so the team reviewing the code could just use Docker, and the VSCode browser to check the code.

After completing the code-challenge, I downloaded the latest version of devpod, but It just could not work, it would build the image, but when getting to the VSCode browser it did send out the address `http://localhost:10800/?folder=/app` where the folder is the workspace folder for my app, if I use the local version of devcontainer on my laptop it works, but not with the VSCode browser.

I delivered the code-challenge with the instruccions for local devcontainer, but I was still curious on why it did not work with devpod, a quick reading into the `devcontainer` [documentation](https://containers.dev/implementors/json_reference/) and I added the `forwardPorts` for in my `devcontainer.json` and now it works.
 
 ```json
 "dockerComposeFile": [
        "docker-compose.yml"
        ],
	"forwardPorts": [80,10800],
```

Devpod still refuses to automatically open the address on my browser, but when typing the web address manually on the browser it does work.

I'll have to dig a bit deeper into why it does not want to open it, but as long as I can see the project on the browser I'm goood to go.
