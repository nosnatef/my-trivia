const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    createUser: async ({ userInput }) => {
        try{
            const result = await User.findOne(
                {
                    $or:[
                        {email: userInput.email},
                        {name: userInput.name}
                    ]
                }
            );
            
            if (result) {
                throw new ('User already exists.')
            }
            else{
                const hashedPW = await bcrypt.hash(
                    userInput.password, 12
                );
                const user = new User({
                    name: userInput.name,
                    email: userInput.email,
                    password: hashedPW,
                    level: 1,
                    exp: 0,
                    coins: 0,
                    created: new Date().toISOString(),
                    last_login: new Date().toISOString()
                });
                const newUserResult = await user.save()
                return {...newUserResult._doc, password: null};
            }
        } catch (e) {
            throw e;
        } 
    },
    login: async ({email, password}) => {
        try{
            const user = await User.findOne({
                email: email
            });
            
            if (!user) {
                throw new Error('Invalid credential.');
            }
            const isAuthed = await bcrypt.compare(password, user.password);
            if (!isAuthed) {
                throw new Error('Invalid credential.');
            }
            const token = jwt.sign({
                userId: user._id,
                email: user.email,
            }, 'secretprivatekey',
            {
                expiresIn: '1h'
            });
            return {
                userId: user._id,
                token: token,
                tokenExpiration: 1,
                name: user.name
            }
        } catch (e) {
            throw e;
        }
    }
}