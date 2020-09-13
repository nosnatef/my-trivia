const authResolver = require('./auth');
const achievementsResolver = require('./achievements');
const usersResolver = require('./users');

const rootResolver = {
    ...authResolver,
    ...achievementsResolver,
    ...usersResolver
};

module.exports = rootResolver;