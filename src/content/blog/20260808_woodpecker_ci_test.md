---
##layout: ../layouts/Blogpost.astro
title: 'Playing with Woodpecker CI'
description: "Woodpecker CI for local pipelines"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'My Avatar'
pubDate: 2026-08-08
jpn: '#'
author: 'Dabiddo'
tags: ["cicd","devops","laravel", "pestphp", "docker"]
---

# Local-First CI with Woodpecker CLI: Modernizing a Legacy Laravel App

After a long hiatus, I’m back on the blog to document a practical workflow improvement on my current project.

Recently, I was tasked with modernizing a legacy Laravel application. Step one was getting it upgraded to **Laravel 13** and **PHP 8.5**. Because the project historically had **zero automated tests**, the first priority during the upgrade was introducing **Pest PHP** to build a safety net and verify critical paths before touching production.

### The Problem: Infrastructure & Vendor Constraints

Our deployment workflow is admittedly raw: we rely on the classic `git pull` followed by an in-place build (dropping dev dependencies) directly on the live server. It’s far from optimal, but infrastructure constraints mean automated remote deployments aren’t an option quite yet.

When looking into continuous integration, **Woodpecker CI** was the clear lightweight choice. However, we hit a roadblock with full server-side CI/CD integration:

- Our Git provider is an external third-party system without OAuth support.
- Self-hosting a full Woodpecker server instance isn't feasible under these constraints.
- Migrating repositories to a new host solely for CI hooks would create unnecessary administrative overhead and client friction.

### The Solution: "Local-First" CI via Woodpecker CLI

Rather than abandoning CI altogether, I decided to leverage **Woodpecker CLI** locally.

The CLI allows running complete Woodpecker pipelines on a developer machine using Docker as the execution backend. Before any code gets pushed or deployed, the build, static analysis, and Pest test suite run inside an isolated container environment identical to production.

---

## The Implementation Plan

Instead of relying on global CLI binaries installed on the host OS, the environment remains fully containerized using Docker Compose.

### Directory Layout

This is the directory structure that worked for me, im forcing the working directories on the docker container, and because I'm mounting the laravel app inside the container, this will mess up the permissions so I created a new `woodpecker_ci` directory and git cloned the repo inside it.

```bash
woodpecker_ci/
├── laravel_app/           # Main Laravel application repository
├── .woodpecker.yml        # Woodpecker pipeline configuration
└── docker-compose.yml     # Local Woodpecker CLI runner wrapper
```

### 1. The Pipeline Definition (`.woodpecker.yml`)

The workflow defines the exact steps required to validate the Laravel app:

```yaml
steps:
  # 1. Install PHP dependencies
  composer-install:
    image: composer:2.10
    commands:
      - php -r "file_exists('.env') || copy('.env.testing', '.env');"
      - composer install --no-interaction --prefer-dist --optimize-autoloader

  # 2. Execute unit tests
  run-tests:
    image: php:8.5-cli-alpine
    environment:
      APP_ENV: testing
      DB_CONNECTION: sqlite
      DB_DATABASE: ":memory:"
    commands:
      - php -r "file_exists('.env') || copy('.env.testing', '.env');"
      - php artisan key:generate
      - ./vendor/bin/pest
```

Im doing this on a Laravel 13 app that uses PHP8.5.

### 2. Local Runner Orchestration (`docker-compose.yml`)

To trigger the local build without installing local CLI dependencies, `docker-compose` bridges the local workspace with the Woodpecker engine:

```yaml
services:
  woodpecker-runner:
    image: woodpeckerci/woodpecker-cli:v3.17-alpine
    container_name: woodpecker-runner
    user: root
    privileged: true
    environment:
      - CI_WORKSPACE=${PWD}/laravel_app
      - WOODPECKER_WORKSPACE=${PWD}/laravel_app
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ${PWD}/laravel_app:${PWD}/laravel_app
      - ${PWD}/.woodpecker.yml:${PWD}/laravel_app/.woodpecker.yml:ro
    working_dir: ${PWD}/laravel_app
    entrypoint: ["woodpecker-cli", "exec"]
```

#### Note:

Because of permissions, I have to run docker using the `sudo` command, that is why my docker-compose file declares the runner as `root` and `privileged`.

#### How the Subdirectory Mounting Works:

- **Workspace Variables (`CI_WORKSPACE` & `WOODPECKER_WORKSPACE`):** Overrides Woodpecker's default workspace path to point explicitly to `${PWD}/laravel_app`. This tells the spawned step containers where to look for source code.
  
- **Volume Mounts:**
  
  - `${PWD}/laravel_app:${PWD}/laravel_app`: Maps the subfolder into both the runner container and any sibling step containers created via `/var/run/docker.sock`.
    
  - `${PWD}/.woodpecker.yml:${PWD}/laravel_app/.woodpecker.yml:ro`: Mounts the parent directory's pipeline schema directly into the targeted working directory as read-only.
    
- **`working_dir`:** Forces `woodpecker-cli exec` to evaluate step commands from inside `laravel_app/`.
  

### 3. Execution Workflow

To trigger local CI before committing or pushing changes:

```bash
docker compose run --rm woodpecker-runner
```

This command will run the woodpecker cli for the local pipeline and remove the container once it has finished.

### What's Next?

For now, the focus is strictly on CI (validation and testing). Establishing a deterministic, reproducible local test runner guarantees that broken builds never make it to git pull on the live server.

While this setup currently handles dependency installation and Pest test runs, the exact same pattern easily extends to cover other crucial pre-push checks:

* Frontend Asset Compilation: Adding a Node/NPM stage to run npm ci && npm run build ensures asset pipelines complete without compilation errors.
* Static Analysis: Integrating a phpstan or larastan stage catches type mismatches and potential bugs before code ever hits the testing suite.

Deployment remains manual for the time being, but once the infrastructure catches up, this exact pipeline configuration can be wired directly into a dedicated remote runner without altering any build logic.