// const groupResolvers = require('./group')
// const userResolvers = require('./user')
const Group = require("../../models/groups");
const User = require("../../models/users");

const groupData = async groupID => {
  try {
    const group = await Group.findById(groupID)
    return {
      ...group._doc,
      // user: user.bind(this, group._doc.user)
    }
  } catch (err) {
    throw err
  }
}

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
        return {
          ...user._doc,
          group: groupData.bind(this, user._doc.groupID)
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addUser(
      parent,
      { displayName, uid, email, avatar, batteryLevel, group },
      context,
      info
    ) {
      const newUser = User({
        displayName,
        uid,
        email,
        avatar,
        batteryLevel,
        groupID: group,
      });
      
      const res = await User.findOneAndUpdate({email: email}, {displayName, uid, avatar, batteryLevel, groupID: group}, {
        new: true,
        upsert: true,
        useFindAndModify: false,
      })

      return {
        ...res._doc,
        group: groupData.bind(this, group)
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
