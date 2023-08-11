const { AuthenticationError } = require("apollo-server-express");
const { User, Locals } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    findAll: async (parent, args) => {
      const allUser = await User.find();
      console.log(allUser);
      return allUser;
    },

    me: async (parent, args, context) => {
      console.log("user context", context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        console.log("user data", userData);
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    // add other queries here
    findLocals: async (parent, args) => {
      const allLocals = await Locals.find();
      console.log(allLocals);
      return allLocals;
    },
    // querey for all Locals
    // querey for individual houseless profile
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addFeed: async (parent, { feedData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { liveFeed: feedData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateFeed: async (parent, { feedId, feedData }, context) => {
      if (context.user) {
        try {
          console.log("feedId: ", feedId)
          const updateFeed = await User.findOneAndUpdate(
            { _id: context.user._id, "liveFeed._id": feedId },
            { $set: { "liveFeed.$.problem": feedData.problem } },
            { new: true }
          )
          return updateFeed
        } catch (e) {
          console.log(e)
        }
      }
    },

    deleteFeed: async (parent, { feedId }, context) => {

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { liveFeed: { _id: feedId } } },
          { new: true }
        );
        console.log("updatedUser: ", updatedUser.liveFeed.length)
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { commentData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { liveFeed: { commentData } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { liveFeed: { commentId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addLocal: async (parent, { localsData }) => {
      // might need to remove locals data from object below (removing curlies)
      const local = await Locals.create(localsData);

      return local;
    },
  },
};

module.exports = resolvers;
