![Repository Banner](https://sstranks.github.io/front-end-mentor/assets/repo_banner.jpg)
<br>

_Frontend Mentor: My solutions to the 'Guru' level challenges available at https://www.frontendmentor.io/_.

![Top Language Badge](https://img.shields.io/github/languages/top/SStranks/front-end-mentor)
![RepoSize Badge](https://img.shields.io/github/repo-size/SStranks/front-end-mentor)
![Last Commit Badge](https://img.shields.io/github/last-commit/SStranks/front-end-mentor)

[![CodeQL Badge](https://github.com/SStranks/front-end-mentor/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/SStranks/front-end-mentor/actions/workflows/github-code-scanning/codeql)
[![Lint Badge](https://github.com/SStranks/front-end-mentor/actions/workflows/lint.yaml/badge.svg)](https://github.com/SStranks/front-end-mentor/actions/workflows/lint.yaml)
[![Vitest Badge](https://github.com/SStranks/front-end-mentor/actions/workflows/vitest.yaml/badge.svg)](https://github.com/SStranks/front-end-mentor/actions/workflows/vitest.yaml)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
  - [Directory Structure](#directory-structure)
- [Setup and Usage](#setup-and-usage)
  - [Production Emulation](#production-emulation)
    - [Quickstart](#quickstart)
  - [Development](#development)
- [Live Demo](#live-demo)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

[Frontend-mentor](https://www.frontendmentor.io/) is a learning platform that provides professional design briefs and Figma files, challenging developers to build pixel-perfect implementations from the specifications.

This repository is a PNPM monorepo containing my solutions to the platform's most advanced (Guru level) challenges while simultaneously documenting my progression as a software engineer.

Showcasing my approach to building responsive, accessible, and maintainable applications. Although the primary focus is frontend development, several challenges also incorporate backend functionality, which allowed exploration of full-stack concepts, application and repository architecture.

## Features

The frontend aspect of all designs centres around fully responsive layouts with breakpoints for key device sizes, including hover states and interactive changes, side-menus, and other requirements that match the Figma design file specifications.

> [!TIP]
> See repsective challenge `README.md` for the unique feature requirements of that challenge

Each challenge contains a docker setup for both development and production; Nginx and MongoDB database implemented in the full-stack challenges.

## Tech Stack

###### Click arrow-section markers to open list

<details open>
<summary>Frontend</summary>
<br>

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Sass](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)](https://sass-lang.com/)
[![HTML5](https://img.shields.io/badge/HTML-e34c26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Webpack](https://img.shields.io/badge/webpack-%238dd6f9.svg?style=for-the-badge&logo=webpack&logoColor=white)](https://webpack.js.org/)

</details>

<details>
<summary>Backend</summary>
<br>

[![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Mongo-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</details>

<details>
<summary>Infrastructure</summary>
<br>

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![NGINX](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)

</details>

<details>
<summary>Testing</summary>
<br>

[![Jest](https://img.shields.io/badge/Jest-97737d?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Testing Library](https://img.shields.io/badge/-Testing%20Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)](https://testing-library.com/)
[![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)](https://developer.chrome.com/)
[![Firefox Browser](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)](https://www.firefox.com/en-GB/channel/desktop/developer/)

</details>

<details>
<summary>Tools</summary>
<br>

[![Figma](https://sstranks.github.io/front-end-mentor/assets/figma_custom_shieldsIO.svg)](https://www.figma.com/) [![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://www.postman.com/) [![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/) [![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) [![Stylelint](https://img.shields.io/badge/stylelint-263238.svg?style=for-the-badge&logo=stylelint&logoColor=white)](https://stylelint.io/) [![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

</details>

<details>
<summary>Repository Management</summary>
<br>

[![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](https://pnpm.io/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![EditorConfig](https://img.shields.io/badge/Editor%20Config-fefefe?style=for-the-badge&logo=editorconfig&logoColor=black)](https://editorconfig.org/)

</details>

## Architecture

![Architecture Diagram](https://sstranks.github.io/front-end-mentor/assets/architecture_diagram.jpg)

###### Note: This is a generalized architecture diagram and may vary depending on the challenge.

## Setup and Usage

Each solution contains Docker Compose files, used during the development process, which offers a chance to explore the designs locally - solutions are also hosted online at Netlify (see [Live Demos](#live-demos)).

> [!TIP]
> Please refer to the corresponding `README.md` for each challenge for instructions on how to setup the local Dockerized environment.

[`Audiophile Ecommerce - README.md`](./apps/audiophile-ecommerce/README.md)

[`Designo Agency - README.md`](./apps/designo-agency/README.md)

[`Invoice App - README.md`](./apps/invoice-app/README.md)

[`Kanban Task App - README.md`](./apps/kanban-task-app/README.md)

[`Project Feedback App - README.md`](./apps/project-feedback-app/README.md)

## Live Demos

###### Challenge solutions hosted at Netlify

<!-- TODO: Add in live hosted sites -->

[Audiophile Ecommerce](www.google.com)

[Designo Agency](www.google.com)

[Invoice App](www.google.com)

[Kanban Task App](www.google.com)

[Project Feedback App](www.google.com)

## License

Licensed under the MIT License – see [`LICENSE`](./LICENSE) for details.

## Acknowledgements

<!-- markdown-link-check-disable -->

![Frontend Mentor](https://img.shields.io/badge/Frontend%20Mentor-3F54A3.svg?style=for-the-badge&logo=frontendmentor&logoColor=white)
![CSS-Tricks](https://sstranks.github.io/front-end-mentor/assets/css-tricks_custom_shieldsIO.svg)
![MDN Web Docs](https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white)
![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)
![Stack Exchange](https://img.shields.io/badge/StackExchange-%23ffffff.svg?style=for-the-badge&logo=StackExchange&logoColor=black)
![freeCodeCamp](https://img.shields.io/badge/Freecodecamp-%23123.svg?&style=for-the-badge&logo=freecodecamp&logoColor=green)
![Udemy](https://img.shields.io/badge/Udemy-A435F0?style=for-the-badge&logo=Udemy&logoColor=white)

<!-- markdown-link-check-enable -->
