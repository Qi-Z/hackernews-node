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
#### Query

#### Mutation

#### Subscription


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
