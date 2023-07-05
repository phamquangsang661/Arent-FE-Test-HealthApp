# **Arent FE Health App**

Testing Health app of Arent business

## **I. DEPENDENCIES**

---

![Npm](https://img.shields.io/badge/NPM-v8.1.2-green?logo=npm&logoColor=white&style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NextJs](https://img.shields.io/badge/NextJS-13-white?logo=nextjs&logoColor=black&style=for-the-badge)
![Tailwinds](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white&style=for-the-badge)
![Prisma](https://img.shields.io/badge/prisma-white?logo=prisma&logoColor=black&style=for-the-badge)
![Trpc](https://img.shields.io/badge/trpc-blue?logo=trpc&logoColor=black&style=for-the-badge)
![SqlLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

## **II. INSTALLATION**

---

Please sure that the version of node is `v16.13.1` before installation

```bash
$ npm install
```

## **III. QUICK INTRODUCES**

---

### **Step 1**: Installation

```bash
$ npm install
```

after install the prisma will auto run generate and seed the data if have

### **Step 2**: Providing and changing the env

We also have .env.example . Please copy and change to .env .

The default of DATABASE_URL is `file:./db.sqlite` for testing purpose.

The default of NEXTAUTH_URL is `http://localhost:3000` for testing purpose.

Please generate JWT_SECRET by using command below in bash environment.

```bash
$ openssl rand -base64 32
```

### **Step 3**: Rerun the prisma for cleaning database

In this case we using sql lite for only testing purpose

Command below will auto generate prisma, migrate-dev database, reset all data and seeding a data

```bash
$ npm run db:auto
```

For the first time or for the testing purpose please using this commend to reset and seeding a new data to test

If you only want to seed data you can use command below

```bash
$ npm run db:seed
```

### **Step 4**: Running the app

For the development, the app will open in host `localhost:3000`

```bash
$ npm run dev
```

For the production

```bash
$ npm run build #build first
$ npm run start
```

## **IV. TESTING INFORMATION**

After run `db:seed` (It will include also in `npm run db:auto`)
The account `test` will be generated. For the testing purpose, please use this account below

```
email: test@gmail.com
password: 123456
```

All the data generated auto by prisma seed are hypothetical and not real!

**Warning**: For any error about the session or auth, please delete cookie in browser and try again!

---

**The public page**

`/column` : Column page

**The auth page**

`/` : Top page

`/me/record` : Record pages

---

For the auth page, if you haven't auth before, the browser will redirect to `/auth/login`

## **V. DEVELOPMENT GUIDELINE**

---

### **1. Front-end - NextJS**

Front-end is using NextJS 13. So you can working with page directly in `./src/pages`

All libs in `./src/libs` is for front end only. It contains:

- Components

- Constant

- Helper

- Hooks

- stores

- types

- validations

For assets, please define in `./src/assets`.

For styles, please define in `./src/styles`.

The project is also using tailwinds. We can set theme and extends it in `./tailwind.config.ts`

For some problem of import libary, because some change of nextjs 13 please using `'use client'` in top of file which import the lib

```
"use client" sits between server-only and client code. It's placed at the top of a file, above imports, to define the cut-off point where it crosses the boundary from the server-only to the client part. Once "use client" is defined in a file, all other modules imported into it, including child components, are considered part of the client bundle.

Since Server Components are the default, all components are part of the Server Component module graph unless defined or imported in a module that starts with the "use client" directive.
```

### **2. Back-end - TRPC**

Back-end is using TRPC. So you can working in `./src/server`

For defining router, please create in `./src/server/api/router`

For now we are support two procedure `public` and `protected` - (Must to allow authenticated)

If you want define any helper, utils or types. Please define in `./src/server/libs`. Note, you can only using this lib in server, because some of lib is not suitable for engine V8 of browser

### **3. Prisma**

Welcome to prisma. For testing purpose, I only using `SQLlite`, if you want any change please edit `DATABASE_URL` .env and re generated database

I also define seed.ts in prisma. If we have any changing of prisma, please check and re code the seed to sure it work normally for everyone

### **4. Common**

When you define the env in .env please add it also to env.mjs in `./src`

We also have `utils` in `./src`. This repo is used for both FE and BE. Please carefully before working with it!

If you have something never change. You can bring it into public folder!

## **VI. EXTENSIONS IN VISUAL STUDIO CODE**

---

- Code spell check

- EsLint

- Gitlens

- JavaScript and TypeScript

- Prisma

- Tailwind CSS IntelliSense

## **VII. ALL COMMAND REFERENCE**

---

### **Start**
---
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### **Build**
---
```bash
$ npm run build

```

### **Deploy**

---

```bash
# Build first
$ npm run build

# Migrate DB and generate seed data (No reset required)
$ npm run db:auto-prod

# For the deploy service
...Coming soon

```

### **Database migrates**

---

```bash
# Generates SQL files and directly runs them against the database for dev
$ npm run db:migrate-dev

# Generates SQL for Prod also
$ npm run db:migrate-prod

# this command reads your Prisma schema and updates the generated Prisma Client library inside node-modules
$ npm run db:generate

#You can also reset the database yourself to undo manual changes or db push experiments by running
$ npm run db:reset

#Seed data for database
$ npm run db:seed

#If you want auto all process from generate -> migrate -> reset -> seed , run as below
$ npm run db:auto

```
