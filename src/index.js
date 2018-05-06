const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

// Resolver functions
// Resolver is extremely important for query, mutation, subscription to be resolved.
// All resolver functions take 4 arguments: root, args, ..., and ...
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => { // Context is a Javascript object that every resolver in the resolver chain can read from and write-to
            return context.db.query.links({}, info) // Here we've attached db to context, so we get access to db
        },
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
            }, info)
        },
        updateLink: (root, args) => {
            // Just curious what the root is here
            console.log('root at updateLink is: ', root);
            let link = links.find(l => l.id === args.id);
            if (!!link) {
                link.url = args.url;
                link.description = args.description;
            }
            return link;
        },
        deleteLink: (root, args) => {
            let idx = links.findIndex(l => l.id === args.id);
            if (idx > -1) {
                const link = links[idx];
                links.splice(idx, 1);
                console.log(`After delete ${args.id}, links becomes ${JSON.stringify(links)}`);
                return link;
            }
            return null;
        }
    },
    Link: { // Link resolver is not necessary here. Just to show how resolver is managed in such hierarchy
        // root is the result of previous resolver execution level
        id: (root) => root.id,
        url: (root) => root.url,
        description: (root) => root.description
    }
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
                endpoint: 'https://us1.prisma.sh/public-abalonedancer-518/hackernews-node/dev',
                secret: 'mysecret123',
                debug: true,
            }),
        }),
    }
);
server.start(() => console.log(`Server is running on http://localhost:4000`)); // Go to http://localhost:4000 to interact with GraphQL, or use POSTman CURL

