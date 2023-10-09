# Password Manager
Password Manager is a tutorial application designed to teach
developers how to create a full stack application using a
variety of technologies and frameworks. Those include [Angular](https://angular.io/),
[NestJS](https://nestjs.com/), [AWS DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html),
[Docker](https://www.docker.com/), and more.

<br/>

## Table of Contents

1. [What is Angular?](#what-is-angular)
2. [What is NestJS](#what-is-nestjs)
3. [What is Docker](#what-is-docker)
4. [What is DynamoDB](#what-is-dynamodb)
5. [What is a Monorepo?](#what-is-a-monorepo)
6. [Getting Started](#getting-started)
    1. [Install Node](#install-node)
    2. [Build the Apps](#build-the-apps)
    3. [Running the Apps](#running-the-apps)

<br/>

## What is Angular?
[Angular](https://angular.io/) is a modern frontend framework
designed to allow developers to create efficient and reliable
single page applications (SPA). The framework is built by Google
and encourages the usage of components created with HTML, CSS,
and TS to build robust web applications. The framework
provides a large collection of libraries and tools to help
developers create faster and take advantage of the latest
technologies and developments with minimal effort.

<br/>

## What is NestJS?
[NestJS](https://nestjs.com/) is a progressive Node.js
server side application framework. It fully supports the usage
of both JavaScript and TypeScript to allow developers flexibility
when creating a server side application. NestJS is built on top
of another server side Node.js framework called [Express](https://expressjs.com/) but provides a more opinionated
approach to development. It can be used to create standalone
APIs or a server side application which serves/supports a
client side application. 

<br/>

## What is Docker?
[Docker](https://www.docker.com/) is a technology that is
widely used across the world. It provides a way for developers
to create an isolated environment for their application to
run in. No more needing to maintain a server and ensure it
is capable or running your application. With Docker, all
a server or computer needs to do is know how to run the image
as a container. This allows developers to create an image
that is dedicated to running their application and run it
anywhere that DOcker is supported.

<br/>

## What is DynamoDB
[DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) is a fully managed and
maintained NoSQL database that AWS provides. DynamoDB is
scalable, fast, and easy to use and relieves developers or
database administrators from needing to manage the server
and hardware components that DynamoDB requires. It also
provides encryption of data at rest as an added layer of
security for your data.

<br/>

## What is a Monorepo?
A monorepo is a code repository which holds multiple applications
and/or libraries. There are many different approaches and usages
of monorepos but a what they provide is a single codebase
that can hold multiple applications and libraries that
potentially depend on one another. Using this project as an
example, a monorepo provides a way for both the UI and API
to share libraries, data models, and become a single deployable.

<br/>

## Getting Started
### Install Node

Install NVM (Node Version Manager)

Windows Only
```bash
choco install nvm
```

Mac Only
```bash
brew install nvm
```

After installing NVM, install the correct version of Node

```bash
nvm install 16.14
```
> This will install Node version 16.14.

Load Node 16.14

```bash
nvm use 16.14
```
> This will load Node version 16.14 as the current node executable version

<br/>

### Build the Apps
There are several libraries and two applications which all
need to be built. Building essentially means compiling the
TypeScript into JavaScript.

Build everything

```bash
yarn build
```
> This will every application and library within the codebase

Build the Config library

```bash
yarn build:config
```

Build the Crypto library

```bash
yarn build:crypto
```

Build the DynamoDB Client library

```bash
yarn build:dynamodb-client
```

Build the Logger library

```bash
yarn build:logger
```

Build the Types library

```bash
yarn build:types
```

Build everything with the Development configuration

```bash
yarn build:dev
```

Build the UI for Development

```bash
yarn build:ui:dev
```

Build the API for Development

```bash
yarn build:api:dev
```

Build everything with the Production configuration

```bash
yarn build:prod
```

Build the UI for Production

```bash
yarn build:ui:prod
```

Build the API for Production

```bash
yarn build:api:prod
```

<br/>

### Running the Apps
There are a few ways to approach running the applications but
for the best local development experience, follow the steps below.

> Make sure Docker is running

Open two terminals. One will be dedicated to running the UI,
while the other will run two Docker containers for the API
and DynamoDB.

Start the UI

```bash
yarn start:ui
```

Start the API and DynamoDB

```bash
yarn docker:up
```

Running the applications this way will allow for hot reloading
when making changes to either the UI or the API.

#### Initializing DynamoDB
DynamoDB when it is first used needs to be configured with
the tables and potentially some seed data for your application
to use. All the tables can be found [here](./data/tables) which
contains configurations for each of the table that should exist
in DynamoDB.

Create the Tables

```bash
yarn dynamo:tables:create
```
> You can tear them down with `yarn dynamo:tables:delete`

Add seed data

```bash
yarn dynamo:data:create
```
> This will add a client record along with two passwords in DynamoDB that can be used for testing

AWS has created a library which allows developers to interact
with a DynamoDB Admin dashboard locally. This can be used to
have a visual representation of the tables and data in your
local DynamoDB instance. Open another terminal and run the following:

```bash
yarn dynamo:admin
```
> If you open your browser to `http://localhost:8080` you will see the dashboard for DynamoDB

