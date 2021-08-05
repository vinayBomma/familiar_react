const Group = require("../../models/groups");
const User = require("../../models/users");

const groupData = async (id) => {
  try {
    // const group = await Group.findById(groupID);
    const groups = await Group.findOne({
      admin: { $in: id },
    });
    // return {
    //   ...group._doc,
    //   // user: user.bind(this, group._doc.user)
    // };
    return groups.map((group) => ({
      ...group._doc,
    }));
  } catch (err) {
    throw err;
  }
};

const userData = async (id) => {
  try {
    const user = await User.findOne({ uid: id });
    return {
      ...user._doc,
    };
    // return users.map((user) => ({
    //   ...user._doc,
    //   user: user.bind(this, group._doc.user)
    // }));
  } catch (err) {
    throw err;
  }
};

module.exports = {
  Query: {
    async groups() {
      try {
        const group = await Group.find();
        return group;
      } catch (err) {
        throw new Error(err);
      }
    },
    async users(_, { id }) {
      try {
        const users = await User.find({
          group: { $in: [id] },
        });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getGroup(_, { id }) {
      try {
        const groups = await Group.find({
          members: { $in: [id] },
        });
        return groups;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { id }) {
      try {
        const user = await User.findOne({ uid: id });
        return {
          ...user._doc,
          // group: groupData.bind(this, _id),
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addUser(
      parent,
      { displayName, uid, email, avatar, batteryLevel },
      context,
      info
    ) {
      const res = await User.findOneAndUpdate(
        { email: email },
        {
          displayName,
          uid,
          avatar,
          batteryLevel,
        },
        {
          new: true,
          upsert: true,
          useFindAndModify: false,
        }
      );

      return {
        ...res._doc,
      };
    },
    async createGroup(
      parent,
      { name, totalMembers, inviteCode, members, admin },
      context,
      info
    ) {
      const addGroup = new Group({
        name,
        totalMembers,
        inviteCode,
        members,
        admin,
      });
      const res = await addGroup.save();

      await User.findOneAndUpdate(
        { uid: members },
        { $push: { group: res._id } },
        { new: true, upsert: true, useFindAndModify: false }
      );

      return {
        ...res._doc,
      };
    },
    async joinGroup(_, { inviteCode, members }) {
      // const checkMember = await Group.findOne({
      //   inviteCode,
      // })

      // TODO Implement check for member already present

      const res = await Group.findOneAndUpdate(
        { inviteCode },
        { $push: { members }, $inc: { totalMembers: 1 } },
        { new: true, upsert: true, useFindAndModify: false }
      );

      await User.findOneAndUpdate(
        { uid: members },
        { $push: { group: res._id } },
        { new: true, upsert: true, useFindAndModify: false }
      );

      return {
        ...res._doc,
      };
    },
    async setLocation(_, { location, uid, batteryLevel }) {
      const res = await User.findOneAndUpdate(
        { uid },
        { $push: { location }, batteryLevel },
        { new: true, upsert: true, useFindAndModify: false }
      );

      // console.log(res.location[(res.location).length - 2])

      return {
        ...res._doc,
      };
    },
  },
};
