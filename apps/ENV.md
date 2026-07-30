# Environment Variables Setup

## Preamble

> [!CAUTION]
>
> - `.env` files should not be used to store secrets or sensitive information.
> - `.env` files should not be committed to online repositories unencrypted.

The safest policy is avoid committing at all and use alternatives e.g. [Github Actions Secrets and Variables](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets#creating-secrets-for-a-repository)

Using `.gitignore` to exclude `.env` files is a typical convention but not recommended. The purpose of Git is to track files within a repository, and therefore all files intentionally excluded from its scope are subject to potential data loss. Git retains authority over a repository folder and untracked files are vulnerable to `git clean` commands invoked intentionally or by third-parties.

## Architecture

Locating `.env` files in a sibling folder relative to the repository folder - that is not monitored by git - provides a safe and centralized store, bypassing potential data loss and unintentional commits of semi-sensitive configuration details.

The naming and structure of the private env store can be customized according to the needs of the project - see [`direnv`](#direnv) for more details.

```console
./
├─ frontend-mentor/                     # project repository
├─ private/                             # global env store
│  ├─ project-1/
│  └─ frontend-mentor/                  # frontend-mentor project
│     ├─ backup/
│     ├─ certs/
│     ├─ docs/
│     ├─ encrypted/
│     ├─ env/                           # frontend-mentor env store
│     ├─ script/
│     ├─ secrets/
```

### direnv

[direnv](https://direnv.net/) is a shell extension that allows automatic loading/unloading of environment variables depending on the active directory. Supported shells: bash, zsh, tcsh, fish, elvish, powershell, murex, nushell.

[Installation](https://direnv.net/docs/installation.html) requires adding the package to your distribution and placing a simple one-line hook into your shell configuration file.

##### .envrc file

A `.envrc` file defines environment variables for a specific directory that direnv will automatically load - variables will be available for all sub-folders unless they contain their own `.envrc` file.

```ini
# ./.envrc

#!/usr/bin/env bash
export FRONTENDMENTOR_PRIVATE="/projects/private/frontend_mentor"

export ENV_DIR="${FRONTENDMENTOR_PRIVATE}/env"
export SECRETS_DIR="${FRONTENDMENTOR_PRIVATE}/secrets"
export CERTS_DIR="${FRONTENDMENTOR_PRIVATE}/certs"

FRONTENDMENTOR_ROOT_ABSOLUTE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export FRONTENDMENTOR_ROOT_ABSOLUTE
```

> [!IMPORTANT]
> The command `direnv allow` must be invoked in the directory of the `.envrc` file to safely allow the extension to process the environment variables.

##### Usage

```ini
# apps/audiophile-ecommerce/client/package.json

"start": "dotenvx run -f \"${ENV_DIR}/audiophile-ecommerce/.env.dev.client\" -- webpack serve --config ./webpack/webpack.dev.ts"
```

```ini
# apps/invoice-app/docker-compose.override.yml

services:
  node-api:
    env_file:
      - ${ENV_DIR}/invoice-app/.env.dev.server
```
