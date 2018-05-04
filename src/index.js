const {GraphQLServer} = require('graphql-yoga');

// 1 Type def
// NOTE: The schema definition is actually string, which means graphql-yoga will have to parse the string.
// maybe into some AST (Abstract Syntax Tree)
// Every field is backed by a resolver function.
// Here we write type definition as string. In fact, it can be put into .graphql files.
// ID is special scalar type in graphql
const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url: String!
}
`;

let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for graphql'
    }
];
// 2 Resolver functions
// Resolver is extremely important for query, mutation, subscription to be resolved.
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },
    Link: { // Link resolver is not necessary here. Just to show how resolver is managed in such hierarchy
        // root is the result of previous resolver execution level
        id: (root) => root.id,
        url: (root) => root.url,
        description: (root) => root.description
    }
};


// 3 Put schema and resolvers into server
const server = new GraphQLServer(
    {
        typeDefs,
        resolvers
    }
);
server.start(() => console.log(`Server is running on http://localhost:4000`)); // Go to http://localhost:4000 to interact with GraphQL, or use POSTman CURL

