# hackernews-node
Following https://www.howtographql.com/graphql-js/0-introduction/ to learn GraphQL with nodejs

## Overview
1. Application layer
> Schema (Can be imported from database layer schema)
> Resolver
> Run this layer like `node src/index.js`
2. Database layer (Prisma)
> Schema for data model only. (Other schema like query, mutation, subscription are auto-generated)
> Config file yaml. Define service name, stage to deploy
> Deploy with `prisma deploy`. It will read prisma.yml.
3. Config files
> Unify all configuration with .graphqlconfig.yml
4. `graphql playground`: the graphql-cli command that run open the browser for both layers API



## Get Started
1. Type definitions define GraphQL Schema (SDL)
2. Resolvers are the actual implementations of the schema

2.1. Resolver takes in 4 parameters. They are `root`, `args`, `context`, and `info`

`context` is a Javascript Object that every resolver in the resolver chain can read from and write to. It's a means to for resolvers to communicatte

`info` object carries information about the incoming graphQL query (in the form of [`query AST`](https://medium.com/@cjoudrey/life-of-a-graphql-query-lexing-parsing-ca7c5045fad8))
----------------------------------------

**Example**

Resolver
```js
const resolver = {
    Query: {
        feed: (root, args, context, info) => {
            // some operations
            return 
        }
    }
}
```

Schema
```graphql
type Query {
    feed(id: ID!): Feed
}

type Feed {
    id: ID!
    url: String!
    description: String!
}
```

Actual query
```graphql
query {
    feed(id: "feed1") {
        id
        url
        description
    }
}
```
`info`: `id, url, and desciption (subselection of fields)` becomes info argument for resolver

`args`: `id: "feed1"` becomes `args`

---------------------------




### GraphQL API <=> GraphQL Schema
At the core of every GraphQL API, there is a GraphQL Schema.

### Three Special Root Types
When we doing API call, only one of these types is allowed at a time
* Single quotes are not allowed
* At least one field must be specified
#### Query

#### Mutation

#### Subscription
This is the part where GraphQL really shines. It brings realtime functionality to your app

Subscription is usually implemented with [WebSockets](https://en.wikipedia.org/wiki/WebSocket)

Prisma has Subscription out-of-box. Inspect the generated schema, it has subscription.

The subscription can fire these events:
* A new node is created
* A new node is updated
* A new node is deleted


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

Once we define the data model in Prisma, Prisma auto-generate schema and resolvers for us.
In order to call these Prisma API using Javascript, we need to have bindings between Javascript functions and Prisma's schema and resolvers.
We need `prisma-binding`

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

**import data model from prisma schema**
A: Both application and database layers have schema, although it's perfectly fine to define
two same schemas, we might want to keep things in one place (source of truth).
So we can import schema from other graphql files

## Questions
* What is `@unique` directive
>

* How do resolvers communicate with each other?
> Through the 3rd argument: `context`

* In signup example, how we make sure password cannot be query?
> Note that the User type is differnt in application layer comprae to database layer
> And the subselction of fields avaible for query is restricted by Schema. So in our example, the User type for app layer has no password field.
> Password can not be query at app layer

