function newLinkSubscribe(parent, args, context, info) {
    console.log('Get called');
    return context.db.subscription.link(
        {where: {mutation_in: ['CREATED']}},
        info,
    );
}

const newLink = {
    subscribe: newLinkSubscribe
};

module.exports = {
    newLink,
};
