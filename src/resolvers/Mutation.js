const {APP_SECRET, getUserId} = require('../utils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// user should be authenticated to use this
function post(parent, args, context, info) {
    const userId = getUserId(context); // If user is not authenticated, error will be thrown here
    return context.db.mutation.createLink({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: {id: userId}}, // This is a connect-mutation, postedBy is set to the User created it
        },
    }, info)
}

// Why async and await
async function signup(parent, args, context, info) {
    // Encrypt password with bcryptjs library
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.db.mutation.createUser({
        data: {
            ...args, password
        },
    }, `{ id }`);

    // jwt library used here
    const token = jwt.sign({userId: user.id}, APP_SECRET);
    return {
        token,
        user // Wouldn't this also returns the hashed password?
    }
}

async function login(parent, args, context, info) {
    const user = await context.db.query.user({where: {email: args.email}}, `{id password}`)
    if(!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid) {
        throw new Error('Invalid password');
    }

    // Get the token for subsequent API request
    const token = jwt.sign({userId: user.id}, APP_SECRET);

    return {
        token,
        user
    }

}

async function vote(parent, args, context, info) {
    const userId = getUserId(context); // context contains header with auth token

    // It also generates one exists function per type from your data model.
    // The exists function takes a where filter object that allows to specify certain conditions about elements of that type.
    // Only if the condition applies to at least one element in the database, the exists function returns true.
    const linkExists = await context.db.exists.Vote({
        user: {id: userId},
        link: {id: args.linkId},
    });

    if(linkExists) {
        throw Error(`Already voted for link:  ${args.linkId}`);
    }

    // Create Link
    return context.db.mutation.createVote({
        data: {
            user: {connect: {id: userId}},
            link: {connect: {id: args.linkId}},
        },
    }, info);
}

module.exports = {
    signup,
    login,
    post,
    vote,
};
