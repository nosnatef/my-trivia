const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  last_login: {
    type: Date,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  gamesPlayed: {
    type: Number,
    required: true
  },
  unlockedAchievements: [
    {
      type: Schema.Types.ObjectId,
      ref: "Achievement",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
