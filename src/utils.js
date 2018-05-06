const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some'; // Used by jwt to sign and verity token

function getUserId(context) {
    // request is from context. REmember when we start the server, the context has req and db instance
    const Authorization = context.request.get('Authorization');
    if(Authorization) {
        const token = Authorization.replace('Bearer ', ''); // Authorization header is like 'Bearer eyjoidyufosjldjfoiuywe...'
        const {userId} = jwt.verify(token, APP_SECRET); // ES6 destruct syntax
        return userId;
    }

    throw new Error('Not authenticated');
}

module.exports = {
    APP_SECRET,
    getUserId,
};
