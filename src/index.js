const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const AuthPayload = require('./resolvers/AuthPayload');
const Subscription = require('./resolvers/Subscription');
const Feed = require('./resolvers/Feed'); // Actually, Feed.links is imported. Similarly for above

// Resolver functions
// Resolver is extremely important for query, mutation, subscription to be resolved.
// All resolver functions take 4 arguments: root, args, ..., and ...
const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
};


// Put schema and resolvers into server
// Instantiate Prisma binding instance
const server = new GraphQLServer(
    {
        // typeDefs can be string or file path to the schema
        typeDefs: './src/schema.graphql',
        resolvers,
        context: req => ({
            ...req,
            // Instantiate Prisma binding instance
            // typeDefs: Prisma database schema
            // endpoint: endpoint of Prisma API
            // secret is needed so Prisma can sign the JWT for you in order to make request to API
            // debug true means that all requests will be logged in the console
            db: new Prisma({
                typeDefs: 'src/generated/prisma.graphql',
                endpoint: 'https://us1.prisma.sh/public-bronzebuffalo-948/hackernews-node/dev',
                secret: 'mysecret123',
                debug: true,
            }),
        }),
    }
);
server.start(() => console.log(`Server is running on http://localhost:4000`)); // Go to http://localhost:4000 to interact with GraphQL, or use POSTman CURL

