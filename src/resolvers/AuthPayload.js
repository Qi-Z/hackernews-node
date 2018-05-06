function user(root, args, context, info) {
    console.log(context.db.query.user({where: {id: root.user.id}}, info));
    return context.db.query.user({where: {id: root.user.id}}, info)
}

module.exports = {
    user,
};
