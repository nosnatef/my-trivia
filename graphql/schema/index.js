const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    level: Int!
    exp: Int!
    created: String!
    last_login: String!
    unlockedAchievements: [Achievement!]
    coins: Int!
}

type Achievement {
    _id: ID!
    name: String!
    description: String!
    coins: Int!
    variable_name: String!
}

type AuthData {
    userId: ID!
    token:  String!
    tokenExpiration: Int!
    name: String!
    user: User!
}

type RootQuery {
    users: [User!]!
    achievements: [Achievement!]!
    login(email: String!, password: String!): AuthData!
    getUser: User!
}

type RootMutation {
    createUser(userInput: UserInput): User
    createAchievement(achievementInput: AchievementInput): Achievement
    unlockAchievement(achievement_name: String): User
    addCoin(coins: Int!): User
}

input UserInput {
    email: String!
    password: String!
    name: String!
}

input AchievementInput {
    name: String!
    description: String!
    coins: Int!
    variable_name: String!
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)