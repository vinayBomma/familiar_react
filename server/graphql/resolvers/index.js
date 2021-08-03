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
    async users() {
      try {
        const user = await User.find();
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getGroup(_, { id }) {
      try {
        const groups = await Group.find({
          admin: { $in: [id] },
        });
        return {
          ...groups._doc,
        };

        // return {
        //   ...groups._doc,
        // };

        // return groups.map((group) => ({
        //   ...group._doc,
        // }));
        // const user = await User.findOne({ uid: id });
        // return{
        //   ...group._doc
        // }
        // return {
        //   ...group._doc,
        // ...user._doc
        // user: userData.bind(this, id),
        // };
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
      { displayName, uid, email, avatar, batteryLevel, group, location },
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
          groupID: group,
          $push: { location },
        },
        {
          new: true,
          upsert: true,
          useFindAndModify: false,
        }
      );

      return {
        ...res._doc,
        group: groupData.bind(this, group),
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

      return {
        ...res._doc,
      };
    },
  },
};
