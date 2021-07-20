const { gql } = require("apollo-server");

module.exports = gql`
  type Group {
    _id: String
    name: String!
    totalMembers: Int
    inviteCode: String
    # members: [Member]
  }
  type Member {
    createdAt: String
  }

  type User {
    _id: String
    uid: String
    displayName: String
    email: String
    avatar: String
    batteryLevel: Int
    groupID: String
  }

  type Query {
    groups: [Group]!
    users: [User]
    getGroup(_id: String): Group
    getUser(_id: String): User
  }
  type Mutation {
    addUser(
      displayName: String!
      uid: String!
      email: String!
      batteryLevel: Int
      groupID: String
    ): User!
    createGroup(name: String, totalMembers: Int, inviteCode: String): Group!
  }
`;
