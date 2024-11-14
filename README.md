# OSSVerse

Seller app

## Prerequisites

1. [Node.Js v22+](https://nodejs.org/)
1. Enable [PNPM](https://pnpm.io/installation)

## Running Locally

1. Run `pnpm i`
2. Run `pnpm dev` to start the applications. app will be online on  http://localhost:3000
3. Run `pnpm format` to format
4. Run `pnpm lint` to lint
5. Run `pnpm spellcheck` to check typo

### Setup with docker
1. Build docker image with provided Dockerfile within project
 ```docker build -t sellerapp .```
2. Run docker image in a container
 ```docker run -d --name sellerapp -p 80:80 sellerapp```
3. Application will be online on http://localhost:80

### Utilities
This repo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Biome](https://biomejs.dev/) for code linting and format

# Running Unit tests
1. Run `pnpm run test`
2. Run `pnpm run coverage`
