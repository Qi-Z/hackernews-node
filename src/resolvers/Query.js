function feed(parent, args, context, info) {
    return context.db.query.links({}, info); // Delegate info to Prisma function. info is the query AST, i.e., the subselection
}

module.exports = {
    feed,
};
