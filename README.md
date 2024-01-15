# Wecommerce

This is a project developed using turborepo with Next App Router, Koajs, Tailwind and Shadcn ui.
It consists on a project that allow creators oor business to generate an easy way to receive by using PIX.
In just a few minutes you can register and create a product link for yourself, then just copy and send the url to
your customer for him/her to pay using PIX.

## Setup

Run the following command:

```sh
pnpm install
```

After that, just copy and setup all the environment variables in each project following **.env.example**

And to run the projects just run the following command:

```sh
pnpm dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `@wecommerce/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@wecommerce/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `server`: [Koa.js](https://koajs.com) app with MongoDB.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).
