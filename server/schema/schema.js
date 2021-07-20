const graphql = require("graphql");
const User = require("../models/users");
const Group = require("../models/groups");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = graphql;

const GroupType = new GraphQLObjectType({
  name: "Group",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    totalMembers: { type: GraphQLInt },
    inviteCode: { type: GraphQLString },
    members: [members],
    // members: {
    //   type: new GraphQLList(UserType),
    //   resolve(parent, args) {
    //     return User.findById({id: parent.id});
    //   },
    // },
  }),   
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    displayName: { type: GraphQLString },
    batteryLevel: { type: GraphQLInt },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString },
    uid: {type: GraphQLString}, 
    // location: { type: GraphQL },
    // inGroup: { 
    //     type: new GraphQLList(GroupType),
    //     resolve(parent, args){
    //         return Group.findById({uid: parent.id})
    //     }
    // },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    group: {
      type: GroupType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Group.findById(args.id);
        // return _.find(books, { id: args.id });
      },
    },
    user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return User.findById(args.id);
          // return _.find(books, { id: args.id });
        },
      },
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})