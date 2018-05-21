// Why async?
// Ans: 
async function feed(parent, args, context, info) {
    // Construct a where object
    // The where object is used Prisma
    const where = args.filter
        ? {
            OR: [
                { url_contains: args.filter },
                { description_contains: args.filter }
            ]
        } : {};

    // Delegate info to Prisma function. info is the query AST, i.e., the subselection
    const queriedLinks = await context.db.query.links(
        {where, skip: args.skip, first: args.first, orderBy: args.orderBy},
        `{id}`, // Why id here? only retrieve the id fields ehre, in fact, it will throw error if you pass `info`
    )

    // Using Link Connection provided by Prisma to retrieve the count
    const countSelectionSet = `
        {
            aggregate {
                count
            }
        }
    `

    const linksConnection = await context.db.query.linksConnection({}, countSelectionSet);
    

    return {
        count: linksConnection.aggregate.count,
        linkIds: queriedLinks.map(link => link.id) // at this resolver level, we only return the linkid
    }
}

module.exports = {
    feed,
};
