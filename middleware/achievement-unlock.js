const { getUser } = require("../graphql/resolvers/users");
const { unlockAchievement } = require("../graphql/resolvers/achievements");
module.exports = async (req, res, next) => {
  if (req.isAuth && req.userId) {
    const userResult = await getUser({}, req);
    const userGamesPlayed = userResult.gamesPlayed;
    let unlockResult;
    if (userGamesPlayed >= 1) {
      unlockResult = await unlockAchievement(
        {
          achievement_name: "triviaBeginner",
        },
        req
      );
    }

    if (userGamesPlayed >= 10) {
      unlockResult = await unlockAchievement(
        {
          achievement_name: "triviaApprentice",
        },
        req
      );
    }

    if (userGamesPlayed >= 100) {
      unlockResult = await unlockAchievement(
        {
          achievement_name: "triviaExpert",
        },
        req
      );
    }
  }
  next();
};
