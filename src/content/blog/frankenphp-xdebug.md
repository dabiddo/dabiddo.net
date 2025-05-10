---
##layout: ../layouts/Blogpost.astro
title: 'FrankenPHP devcontainer Xdebug'
description: "Install and configure Xdebug in a FrankenPHP devcontainer."
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'I like my avatar'
pubDate: 2025-05-10
jpn: '#'
author: 'Dabiddo'
tags: ["docker","personal","devcontainers","php","xdebug"]
---

# Setting Up Xdebug with FrankenPHP Laravel in DevContainer

This guide demonstrates how to configure Xdebug with FrankenPHP Laravel in a DevContainer environment. After several weeks of testing different configurations, here's a working solution for Linux-based systems. While this guide focuses on Linux, the configuration may work on macOS or Windows with WSL with minor adjustments.

**Prerequisites**

Docker and Docker Compose installed

Visual Studio Code with Remote - Containers extension

Basic understanding of DevContainer configuration

FrankenPHP Laravel project set up

## Configuration Steps
1. Modify the Dockerfile

Add the following configuration to your Dockerfile to install and enable Xdebug:

```Dockerfile
# Install Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Copy Xdebug configuration
COPY config/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
```

2. Create Xdebug Configuration File

Create a new file `.devcontainer/config/xdebug.ini` with the following settings:
```bash
zend_extension=xdebug.so
xdebug.mode=debug
xdebug.start_with_request=yes
xdebug.discover_client_host=1
xdebug.client_port=9003
xdebug.log=/tmp/xdebug.log
```


These settings enable:

Automatic debugging session start with requests

Client host discovery

Debug port 9003 (default for Xdebug 3)

Logging for troubleshooting

3. Configure VS Code Launch Configuration

Create `.vscode/launch.json` in your project root with the following content:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "port": 9003,
            "pathMappings": {
                "/app": "${workspaceFolder}"
            }
        }
    ]
}
```

The path mapping `/app` should match your container's working directory. Adjust if different.

4. Update DevContainer Configuration

Modify your `.devcontainer/devcontainer.json` to include Xdebug environment variables and required extensions:

```json
{
    // ... other configurations ...
    "remoteEnv": {
        "XDEBUG_MODE": "debug",
        "XDEBUG_CONFIG": "client_host=host.docker.internal client_port=9003"
    },
    "customizations": {
        "vscode": {
            "extensions": [
                "xdebug.php-debug",
                // ... other extensions ...
            ]
        }
    }
}
```

Verification and Usage

Rebuild your DevContainer after making these changes

Set breakpoints in your PHP code

Start debugging in VS Code (F5 or Debug panel)

Make a request to your application

Troubleshooting

If debugging isn't working:

Check the Xdebug log at `/tmp/xdebug.log` inside the container

Verify Xdebug is installed and enabled:

`php -v | grep Xdebug`


Ensure the debug port (9003) isn't blocked by firewalls

Verify path mappings match your actual container configuration

**Notes**

The `host.docker.internal` is important for Docker to resolve the host machine's IP address, especially in development environments

Xdebug 3 uses port 9003 by default (different from Xdebug 2's default port 9000)

The configuration assumes your project code is mounted at /app in the container

**References:**

[Yo Programo](https://yoprogramo.com/2024/10/12/depurando-php-con-xdebug-y-docker/)

[Dabiddo - qiita blog](https://qiita.com/dabiddo/items/c5d136c6ed058d0f30ad)