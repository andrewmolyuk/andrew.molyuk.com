---
title: 'Monorepo vs. Polyrepo'
date: 2023-09-11T12:49:23+03:00
tags: ['monorepo', 'polyrepo']
image: 'index.png'
draft: false
---

With the development of web application architectural design, microservices have become a successful new trend in
application landscape construction. Alongside advancements in application architecture, transport protocol methods such
as REST and gRPC are becoming more efficient and faster. Additionally, containerization of microservices significantly
contributes to flexible development and rapid delivery. Everything is evolving and embracing new principles and
approaches. However, the question of how best to organize the project structure remains open. In this article, I will
discuss two approaches to organizing project structure: monorepo and polyrepo.

I understand well that the topic has been discussed extensively on the internet, and the holy war between proponents and
opponents of each approach shows no signs of abating. Nevertheless, I have decided to share my thoughts on this matter.

<!--more-->

## Monorepo

So what exactly is a monorepo? A monorepo is an approach to organizing project structure where all project code is
stored in a single repository. For example, we can store frontend code and backend code in one repository. This approach
allows us to easily manage and deploy the code together. Additionally, it enables us to easily manage dependencies
between projects in the repository. Furthermore, it allows us to store all infrastructure configurations, tests, and
documentation in one place.

Industry giants like Google, Facebook, Twitter, and Uber use monorepos for their projects. But that doesn't mean
monorepo is a panacea. This approach has its drawbacks. The main disadvantage is that with a large volume of code,
dependencies between projects start to grow, affecting architectural decisions, ultimately leading to monolithic
dependencies in the project. In other words, the code structure starts to influence architectural decisions, which is
not ideal.

## Polyrepo

Polyrepo is an approach to organizing project structure where each project is stored in a separate repository. The main
advantages of such separation include low coupling between projects and the ability to use different programming
languages for different projects. As a result, these repositories are much easier to manage and develop.

However, this approach also has its drawbacks. The main disadvantage is that with a large number of projects, managing
them becomes complex. But on the other hand, this can be addressed with tools for managing multiple repositories.

## Which One to Choose?

Let's look at the selection criteria, and then it will become clear what suits your specific project best.

### Dependencies

In a monorepo, we always work with the latest version, and almost all code, with rare exceptions, is shared. It's very
easy to touch shared code and break it, requiring additional testing and validation.

In a polyrepo, shared code is published as separate projects and is more manageable and transparent. However, it
requires working with different versions of libraries, which requires additional effort.

### Team Collaboration

A monorepo is transparent to all teams, making it much easier to standardize and formalize code. Therefore, for any
teams working together on the entire project, this is an advantage.

On the other hand, a polyrepo is definitely more effective when you have remote teams and require a granular approach to
managing access to code.

### DevOps

A monorepo can be easily built entirely if you need to release a version of all components, whereas a polyrepo makes it
easier to manage the lifecycle of each project in the system regardless of the repository structure. Microservices
architecture reduces the need for large version releases.

### Refactoring

In a monorepo, it's easy to make changes to the code and track all dependencies. In a polyrepo, you have to make changes
in all repositories and often deal with more complex migration scenarios to new interfaces.

## Conclusion

I've tried to share my thoughts on what monorepo and polyrepo are and what the main criteria for choosing between them
are. Each solution has its advantages and disadvantages, so in each specific case, it's necessary to choose what fits
your project best.

Additionally, I'd like to add that any project over time takes shape and a structure similar to the organization's
structure. Therefore, at the start in a small team, I always use a monorepo, and then periodically review the need for
changes over time. In two companies, I've had the experience of organically transitioning from a monolith in a monorepo
to microservices in a polyrepo. So, confidently start with a monorepo, but be ready to change the code structure.

I hope this article was helpful and interesting. If you have any questions or comments, feel free to reach out. I'll be
glad to respond.
