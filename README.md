# hackernews-node
Following https://www.howtographql.com/graphql-js/0-introduction/ to learn GraphQL with nodejs

## Get Started
1. Type definitions define GraphQL Schema (SDL)
2. Resolvers are the actual implementations of the schema

### GraphQL API <=> GraphQL Schema
At the core of every GraphQL API, there is a GraphQL Schema.

### Three Special Root Types
When we doing API call, only one of these types is allowed at a time
* Single quotes are not allowed
* At least one field must be specified
#### Query

#### Mutation

#### Subscription
### Introspection
http://graphql.org/learn/introspection/
GraphQL provides a powerful introspection system which allows you to peek what schema is available etc.
It has security concern.

## References
### `graphql-yoga`
It is a GraphQL server with features include:
* GraphQL spec-compliant: GraphQL is just a specification, there can be other implementations of it.
* Supports file upload: Nice
* Realtime functionality with GraphQL subscriptions
* Works with TypeScript typings
* Out-of-the-box support for GraphQL Playground
* Extensible via Express middlewares
* Resolves custom directives in your GraphQL schema
* Query performance tracing
* Accepts both application/json and application/graphql content-types
* Runs everywhere: Can be deployed via now, up, AWS Lambda, Heroku etc.


### Prisma
Prisma is the layer between graphql and database.
[Client] - [graphql] - [Prisma] - [database]

#### Problems we face:
Authentication, authorization (permission), pagination, filtering, realtime,  integrating with 3rd-party services or legacy system

#### Two options to solve those:
1. Access the database directly (by writing SQL orusing another NoSQL database API)
2. Use an ORM that provides an abstraction for your database and lets you access it directly form your programming language

Both these two comes with disadvantages:
1. Writing SQL is tedious and error-prone, because they are plain string.
2. most ORM allow only simple query, won't suffice our need for complex operation

**Prisma to rescue**
1. Prisma provide you with GraphQL query engine which will resolve queries for you.
(Note: remember that query is resolved by calling resolvers)
2. Prisma provides query delegation

#### Keywords or prisma
* Query delegation
* Prisma-bindings
* schema stitching
* schema delegation

### Architecture of [Client] - [graphql] - [Prisma] - [database]
There are two types of GraphQL APIs we need to write.
1. Application Layer
On this layer, we write GraphQL API which our application wilil talk to.
We've done this by writing API for getting links and feeds.

2. Database Layer
We need GraphQL-based interface to access database.
Prisma can translate your data model in SDL to an according database schema and sets up the underlying database accordingly.

```quote
When you’re then sending queries and mutations 
to the Prisma GraphQL API, it translates those into database operations and performs these operations for you. Neat, right?
```


When writing Prisma GraphQL API, we need .yml file for configuration.
https://www.prisma.io/docs/reference/service-configuration/prisma.yml/yaml-structure-ufeshusai8

**Why is a second GraphQL API needed in a GraphQL server architecture with Prisma**
A: The Prisma API only is an interface to the database, but doesn't allow for any sort of application logic which is 
needed in most applications

