const { GraphQLServer } = require('graphql-yoga');

// 1 Type def
// NOTE: The schema definition is actually string, which means graphql-yoga will have to parse the string.
// maybe into some AST (Abstract Syntax Tree)
// Every field is backe by a resolver function.
const typeDefs = `
type Query {
    info: String!
}
`;

// 2 Resolver functions
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`
    }
};


// 3 Put schema and resolvers into server
const server = new GraphQLServer(
    {
        typeDefs,
        resolvers
    }
);
server.start(()=> console.log(`Server is running on http://localhost:4000`)); // Go to http://localhost:4000 to interact with GraphQL, or use POSTman CURL

