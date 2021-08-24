<p align="center">
  <a href="http://codely.tv">
    <img src="http://codely.tv/wp-content/uploads/2016/05/cropped-logo-codelyTV.png" width="192px" height="192px"/>
  </a>
</p>

<h1 align="center">
  🐘🎯 Hexagonal Architecture, DDD & CQRS in Typescript
</h1>

<p align="center">
    <a href="https://github.com/CodelyTV"><img src="https://img.shields.io/badge/CodelyTV-OS-green.svg?style=flat-square" alt="codely.tv"/></a>
    <a href="http://pro.codely.tv"><img src="https://img.shields.io/badge/CodelyTV-PRO-black.svg?style=flat-square" alt="CodelyTV Courses"/></a>
</p>

<p align="center">
  Example of a Typescript application following Domain-Driven Design (DDD) and
  Command Query Responsibility Segregation (CQRS) principles keeping the code as simple as possible.

</p>

## 🚀 Environment Setup

### 🐳 Needed tools

1. [Install Docker](https://www.docker.com/get-started)
2. Clone this project: `git clone https://github.com/DanielCaris/perform-challenge perform-challenge`
3. Move to the project folder: `cd perform-challenge`

### 🛠️ Environment configuration

1. Create a local environment file (`cp .env .env.local`) if you want to modify any parameter

### 🔥 Application execution

1. Install all the dependencies and bring up the project with Docker executing: `make build`
2. Then you'll have 3 apps available (2 APIs and 1 Frontend):
  1. [Marketplace Backend](src/apps/marketplace/backend): http://localhost:8030/health-check
  2. [Backoffice Backend](src/apps/backoffice/backend): http://localhost:8040/health-check
  3. [Backoffice Frontend](src/apps/backoffice/frontend): http://localhost:8041/health-check

### ✅ Tests execution

1. Install the dependencies if you haven't done it previously: `make deps`
2. Execute Jest and Behat tests: `make test`

## 👩‍💻 Project explanation

This project tries to be a Marketplace platform. It's decoupled from any framework, but it has
some Express implementations.

### ⛱️ Bounded Contexts

* [Marketplace](src/Contexts/Marketplace): Place to look in if you wanna see some code 🙂. Massive Open Online Courses public platform with users, videos, notifications, and so on.
* [Backoffice](src/Contexts/Backoffice): Here you'll find the use cases needed by the Customer Support department in order to manage users, courses, videos, and so on.

### 🎯 Hexagonal Architecture

This repository follows the Hexagonal Architecture pattern. Also, it's structured using `modules`.
With this, we can see that the current structure of a Bounded Context is:

```scala
$ tree -L 4 src

src
|-- Mooc // Company subdomain / Bounded Context: Features related to one of the company business lines / products
|   `-- Videos // Some Module inside the Mooc context
|       |-- Application
|       |   |-- Create // Inside the application layer all is structured by actions
|       |   |   |-- CreateVideoCommand.php
|       |   |   |-- CreateVideoCommandHandler.php
|       |   |   `-- VideoCreator.php
|       |   |-- Find
|       |   |-- Trim
|       |   `-- Update
|       |-- Domain
|       |   |-- Video.php // The Aggregate of the Module
|       |   |-- VideoCreatedDomainEvent.php // A Domain Event
|       |   |-- VideoFinder.php
|       |   |-- VideoId.php
|       |   |-- VideoNotFound.php
|       |   |-- VideoRepository.php // The `Interface` of the repository is inside Domain
|       |   |-- VideoTitle.php
|       |   |-- VideoType.php
|       |   |-- VideoUrl.php
|       |   `-- Videos.php // A collection of our Aggregate
|       `-- Infrastructure // The infrastructure of our module
|           |-- DependencyInjection
|           `-- Persistence
|               `--MySqlVideoRepository.php // An implementation of the repository
`-- Shared // Shared Kernel: Common infrastructure and domain shared between the different Bounded Contexts
    |-- Domain
    `-- Infrastructure
```

#### Repository pattern
Our repositories try to be as simple as possible usually only containing 2 methods `search` and `save`.
If we need some query with more filters we use the `Specification` pattern also known as `Criteria` pattern. So we add a
`searchByCriteria` method.

You can see an example [here](src/Contexts/Marketplace/Courses/domain/CourseRepository.ts)
and its implementation [here](src/Contexts/Marketplace/Courses/infrastructure/persistence/MongoCourseRepository.ts).

### Aggregates
You can see an example of an aggregate [here](src/Contexts/Marketplace/Courses/domain/Course.ts). All aggregates should
extend the [AggregateRoot](src/Contexts/Shared/domain/AggregateRoot.ts).

### Command Bus
There is 1 implementations of the [command bus](src/Contexts/Shared/domain/CommandBus.ts).
1. [Sync](src/Contexts/Shared/infrastructure/CommandBus/InMemoryCommandBus.ts) using the Symfony Message Bus

### Query Bus
The [Query Bus](src/Contexts/Shared/infrastructure/QueryBus/InMemoryQueryBus.ts) uses the Symfony Message Bus.

### Event Bus
The [Event Bus](src/Contexts/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus.ts) uses the Symfony Message Bus.
The [RabbitMQ Bus](src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus.ts) uses RabbitMQ C extension.

## 📱 Monitoring
Every time a domain event is published it's exported to Prometheus. You can access to the Prometheus panel [here](http://localhost:9999/).
