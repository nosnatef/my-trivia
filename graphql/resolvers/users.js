const User = require('../../models/user');

const { formatUser } = require('./merge');

module.exports = {
    users: async () => {
        try{
            const users = await User.find();
            return users.map(user => {
                return formatUser(user);
            });
        } catch (e) {
            throw e;
        }
    }
}