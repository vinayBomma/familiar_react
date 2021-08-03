const { gql } = require("apollo-server");

module.exports = gql`
  type Group {
    _id: String
    name: String
    totalMembers: Int
    inviteCode: String
    members: [String]
    admin: [String]
  }

  type User {
    _id: String
    uid: String
    displayName: String
    email: String
    avatar: String
    batteryLevel: Int
    location: [String]
  }

  type Query {
    groups: [Group]!
    users: [User]!
    getGroup(id: String): Group
    getUser(id: String): User
  }

  type Mutation {
    addUser(
      displayName: String!
      uid: String!
      email: String!
      avatar: String!
      location: [String]
      batteryLevel: Int
    ): User!

    createGroup(
      name: String!
      totalMembers: Int!
      inviteCode: String!
      members: [String]
      admin: [String]
    ): Group!
  }
`;
