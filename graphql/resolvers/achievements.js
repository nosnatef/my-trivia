const Achievement = require("../../models/achievement");
const User = require("../../models/user");

const { formatUser } = require("./merge");

module.exports = {
  achievements: async () => {
    try {
      const achievements = await Achievement.find();
      return achievements;
    } catch (e) {
      throw e;
    }
  },
  createAchievement: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("No permission.");
    }
    try {
      const achievement = new Achievement({
        name: args.achievementInput.name,
        description: args.achievementInput.description,
        coins: args.achievementInput.coins,
        variable_name: args.achievementInput.variable_name,
      });
      const result = await achievement.save();
      return { ...result._doc };
    } catch (e) {
      throw e;
    }
  },
  unlockAchievement: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("No permission.");
    }
    try {
      const achievementResult = await Achievement.findOne({
        variable_name: args.achievement_name,
      });
      if (achievementResult) {
        const unlockedAchievement = achievementResult._id;
        const userResult = await User.findOne({
          _id: req.userId,
        });
        if (!userResult) {
          throw new Error("User does not exist.");
        } else {
          userResult.unlockedAchievements.push(unlockedAchievement);
          const finalResult = await userResult.save();
          return formatUser(finalResult);
        }
      } else {
        throw new Error("Achievement does not exist.");
      }
    } catch (e) {
      throw e;
    }
  },
};
