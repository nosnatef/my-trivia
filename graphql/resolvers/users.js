const User = require("../../models/user");

const { formatUser } = require("./merge");

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return formatUser(user);
      });
    } catch (e) {
      throw e;
    }
  },
  addCoin: async (args, req) => {
    try {
      const filter = {
        _id: req.userId,
      };
      const update = {
        $inc: {
          coins: args.coins,
        },
      };
      if (!req.isAuth) {
        throw new Error("No permission.");
      }
      const userResult = await User.findByIdAndUpdate(filter, update);
      if (userResult) {
        return formatUser(userResult);
      } else {
        throw Error("User does not exist.");
      }
    } catch (e) {
      throw e;
    }
  },
  getUser: async (args, req) => {
    try {
      const filter = {
        _id: req.userId,
      };
      if (!req.isAuth) {
        throw new Error("No permission.");
      }
      const userResult = await User.findById(filter);
      if (userResult) {
        return formatUser(userResult);
      } else {
        throw Error("User does not exist.");
      }
    } catch (e) {
      throw e;
    }
  },
  getLeaderboard: async (args, req) => {
    try {
      const userResult = await User.find()
        .sort({
          coins: -1,
        })
        .limit(10);
      if (userResult) {
        const returnResult = userResult.map((user) => formatUser(user));
        return returnResult;
      }
    } catch (e) {}
  },
};
