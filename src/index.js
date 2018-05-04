const {GraphQLServer} = require('graphql-yoga');

let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for graphql'
    }
];

let idCount = links.length; // Keep track of link id

// 2 Resolver functions
// Resolver is extremely important for query, mutation, subscription to be resolved.
// All resolver functions take 4 arguments: root, args, ..., and ...
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (root, args) => {
            return links.find(l => l.id === args.id);
        }
    },
    Mutation: {
        post: (root, args) => {
            const {url, description} = args;
            const link = {
                id: `link-${idCount++}`,
                url,
                description
            };
            links.push(link);
            return link;
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


// 3 Put schema and resolvers into server
const server = new GraphQLServer(
    {
        // typeDefs can be string or file path to the schema
        typeDefs: './src/schema.graphql',
        resolvers
    }
);
server.start(() => console.log(`Server is running on http://localhost:4000`)); // Go to http://localhost:4000 to interact with GraphQL, or use POSTman CURL

