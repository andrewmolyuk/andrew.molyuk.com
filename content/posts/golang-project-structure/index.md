---
title: 'Golang Project Structure'
date: 2023-06-02T13:22:51+03:00
draft: false
tags: ['golang', 'project', 'microservices']
params:
  image: 'index.png'
---

I came to Go about a year ago. I write in it in my spare time and I like it. I think it's a very good language for both
beginners in IT and those who already have programming experience. To date, I use Go in my personal projects and in
professional work.

After a year of using the language in production, I can confidently say that Go has only shown itself from the best
side. Having mainly Javascript developers in the team, I had no difficulties in introducing them to the course of
things. The readability and simplicity of the language allows you to quickly understand the code. But I wouldn't say
that Go is a simple language.

<!--more-->

During this time, I have written several microservice projects in Go. They were all of different sizes and complexities,
but in each of them, I tried to use similar approaches to the project structure. Gradually, I came to a structure that
I like. I do not claim that this is the best structure for a microservice project, but it works for me. I hope you
will like it too.

In addition, I want to note that I am not an expert in Go. I'm just sharing my experience. If you notice any mistakes or
have suggestions for improvement, do not hold back and write to me about it.

## Project Structure

I took the ideas from Clean Architecture and in symbiosis with basic recommendations, after several iterations, I got
the following project structure:

```shell
.
├── deploy
├── pkg
│   ├── config
│   ├── grpc
│   ├── log
│   ├── mongodb
│   └── types
├── services
│   └── service1
│       ├── app
│       │   ├── grpc
│       │   └── http
│       ├── business
│       │   ├── core
│       │   ├── data
│       │   └── system
│       └── deploy
├── tools
└── web
    ├── deploy
    ├── public
    ├── node_modules
    ├── static
    └── src
```

Now let's take a closer look at what these folders are and what files they contain.

### deploy

This folder contains files necessary for deploying the project. Depending on the size of the project and the required
infrastructure, the deployment can be centralized or specific to each of the services. This is also where files for
deploying common subsystems can be found. This is the most appropriate place for Kubernetes or Docker Compose files. In
most cases, I use Docker Compose for local development and Docker Swarm for production deployment.

### pkg

This folder contains all local packages used in the project. I do not use external packages inside the `pkg` folder. All
external packages are stored in the `vendor` folder. All packages inside the `pkg` folder should be independent and
should not have dependencies on packages outside this folder. This allows for easy reuse of packages in other projects.
If a package can be moved to a separate repository, but it has not yet grown to that level and is only needed within
this project - you can safely put it here.

You can hide packages with the `internal` folder, but I see no point in this as it only clutters the project.

In the project structure above, I provided several packages as examples that I use in my projects. Let's quickly go over
them.

- config - a package for working with configuration. I sometimes use a wrapper over
  [viper](https://github.com/spf13/viper) or something small and custom depending on the project.
- grpc - a package for working with gRPC. I use [grpc-go](https://grpc.io/docs/languages/go/quickstart/) and
  [grpc-gateway](https://grpc-ecosystem.github.io/grpc-gateway/). In this package, I store all the necessary files for
  working with gRPC and gRPC-gateway.
- log - a package for working with logs. As a rule, I use [zap](https://pkg.go.dev/go.uber.org/zap) from Uber. This is
  a very fast and convenient package for working with logs.
- mongodb - a package for working with MongoDB. I use [mongo-go-driver](https://github.com/mongodb/mongo-go-driver).
- types - a package for storing common types. I use it to store common data types that are used in different parts of
  the project. As a rule, I try to redefine types from external packages in this package. This allows not to create
  dependencies on external packages within the project domain.

All the above packages inside the `pkg` folder are defined as examples and can be changed depending on the project.

### services

The most important directory in the project. This is where all the project's services are stored. Each service has its
own folder, and inside it are all the necessary files. This folder also contains the `main.go` file, which is the entry
point to the application. In this file, I try to keep the minimum necessary code for startup, including dependency
initialization and server startup.

Inside the service folder, there are three folders: `app`, `business`, and `deploy`. Let's go over each of them.

#### service/app

This folder contains files related to the external interface of the application. In my example, inside this folder,
there are two folders: `grpc` and `http`. They contain files related to gRPC and HTTP respectively. Inside these
folders, there may be files with request handlers, middleware files, files with validators of external data, etc.
Ultimately, this folder should only contain files related to the external interface of the application and not connected
with its business logic. This is more of a transport gateway that accepts requests, validates them, passes them to the
business logic, and returns a response.

#### service/business

This folder contains files related to the business logic of the application. In my example, inside this folder, there
are three folders:

- core - a folder with files related to the core of the business logic. This folder contains files with entities that
  describe the business logic of the application. There should not be any auxiliary files here that are not related to
  business logic.
- data - a folder with files related to data processing. This folder contains files with repositories responsible for
  working with the database. There should not be any auxiliary files here that are not related to data processing. This
  folder can also contain files with services responsible for working with external services. For example, if a service
  aggregates data from several external services, then the files with access to these services should be in this folder,
  and the business logic should use them.
- system - a folder with files related to system things. I usually keep files with middleware here that are not related
  to business logic. For example, if you need to log all requests to the service, then the file with the middleware
  responsible for logging should be in this folder. Also, there can be files with auxiliary functions that are not
  related to business logic.

#### service/deploy

This folder contains files related to the deployment of this service. As a rule, I limit myself to the `Dockerfile`. In
it, I describe all the necessary steps to start the service. Everything else I do through `docker-compose` and
`Makefile` at the project level.

### tools

This folder contains files related to the project's tools. These can be files with code generators, administrative
applications, or log formatters. Anything that can help you in development but is not related to the code of the project
itself should be in this folder.

### web (optional)

Sometimes the project requirements include the need to create an administrative panel. In this case, I create a `web`
folder and create a helper web application in it. This can be anything at your discretion. As a rule, I use
[vite](https://vitejs.dev/) with React under the hood.

The folder also contains `deploy` and `public` folders, which are similar to folders with the same names in the
`services` folder.

All the above folders inside the `web` folder are defined as examples and can be changed depending on the project.

## Makefile

At the root of the project is a `Makefile` that contains all the necessary commands for working with the project. All
commands in this file are divided into two groups: `dev` and `prod`. The `dev` group commands are intended for working
with the project during development, and the `prod` group commands are intended for working with the project in
production. All `prod` group commands are used only in CI/CD, and `dev` group commands are used only during development.

Typically, the `dev` group contains commands to start the project, and the `prod` group contains commands for
deployment. Here is an example from the `Makefile` of one of my test projects:

```makefile
dev-swarm-up: build
 docker swarm init

 docker stack deploy -c ./deploy/portainer-stack.yml portainer

    docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
 docker config create loki_config ./deploy/loki-config.yml
 docker stack deploy -c ./deploy/grafana-loki-stack.yml loki

 docker stack deploy -c ./deploy/app-stack.yml app
 ...
.PHONY: swarm-up
```

In this example, I initialize Docker Swarm and deploy several services. All commands from the `prod` group should be in
the format `prod-<command>`, and all commands from the `dev` group should be in the format `dev-<command>`.

## Conclusion

In this article, I described my approach to project structure. I do not claim that this is the only correct approach,
but it suits me until new requirements appear. If you have any ideas for improving this approach, then
write me a word. I will be happy to listen to your ideas and, perhaps, add them to my approach and use them in
my projects.
