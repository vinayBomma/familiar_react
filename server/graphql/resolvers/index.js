// const groupResolvers = require('./group')
// const userResolvers = require('./user')
const Group = require("../../models/groups");
const User = require("../../models/users");

module.exports = {
  Query: {
    async groups() {
      try {
        const group = await Group.find();
        console.log(group);
        return group;
      } catch (err) {
        throw new Error(err);
      }
    },
    async users() {
      try {
        const user = await User.find();
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getGroup(_, { _id }) {
      try {
        const group = await Group.findById({ _id });
        return group;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { _id }) {
      try {
        const user = await User.findById({ _id })
        console.log(user)
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addUser(
      parent,
      { displayName, uid, email, batteryLevel, groupID },
      context,
      info
    ) {
      // #TODO Need to do it faster
      const newUser = User({
        displayName,
        uid,
        email,
        batteryLevel,
        groupID,
      });

      const res = await newUser.save();
      console.log(res);

      return {
        ...res._doc,
        //   id: res._id,
        displayName,
        uid,
        email,
        batteryLevel,
        groupID,
      };
    },
    async createGroup(parent, args, context, info) {
      const { name, totalMembers, inviteCode } = args;
      const addGroup = new Group({ name, totalMembers, inviteCode });
      const res = await addGroup.save();
      console.log(res);

      return {
        ...res._doc,
        name,
        totalMembers,
        inviteCode,
      };
    },
  },
};
