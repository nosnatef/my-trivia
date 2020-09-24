const Achievement = require('../../models/achievement');

const achievement = async (id) => {
    try {
        const result = await Achievement.findById(id);
        return {
            ...result._doc
        }
    } catch (e) {
        throw e;
    }
    
};

const formatUser = async (user) => {
    return { ...user._doc,
        unlockedAchievements:user.unlockedAchievements.map(async (a) => {
            return await achievement(a);
        })};
};

exports.formatUser = formatUser;