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
    location: [String],
    group: [String]
  }

  type Query {
    groups: [Group]!
    users(id: String): [User]!
    getGroup(id: String): [Group]!
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
      group: [String]
    ): User!

    createGroup(
      name: String!
      totalMembers: Int!
      inviteCode: String!
      members: [String]
      admin: [String],
    ): Group!

    joinGroup(
      inviteCode: String!,
      members: [String]
    ): Group!

    setLocation(
      location: [String]!
      uid: String!
      batteryLevel: Int!
    ): User!
  }
`;
