const { GraphQLServer } = require('graphql-yoga');

// 1 Type def
// NOTE: The schema definition is actually string, which means graphql-yoga will have to parse the string
const typeDefs = `
type Query {
    
}
`