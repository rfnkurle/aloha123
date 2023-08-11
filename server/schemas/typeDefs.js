const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String
    lastname: String
    zipcode: String
    location: String
    image: String
    email: String
    password: String
    liveFeed: [Feed]
  }

  type Feed {
    _id: ID
    status: String
    problem: Boolean
    createdAt: String
    comments: [Comments]
  }
  type Comments {
    commentId: ID
    createdAt: String
    commentText: String
  }
  type Locals {
    name: String
    hometown: String
    image: String
    whatToKnow: String
    support: String
    whereAreYou: String
  }

  type Auth {
    token: ID
    user: User
  }

  input FeedInput {
    feedId: ID
    status: String
    problem: Boolean
  }

  input CommentInput {
    commentId: ID
    commentText: String
  }

  input localsInput {
    name: String
    hometown: String
    image: String
    whatToKnow: String
    support: String
    whereAreYou: String
  }

  type Query {
    me: User
    findAll: [User]
    findLocals: [Locals]
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(
      firstname: String
      lastname: String
      zipcode: String
      email: String
      password: String
    ): Auth
    addFeed(feedData: FeedInput): User
    updateFeed(feedId: ID, feedData: FeedInput): User
    deleteFeed(feedId: ID): User
    addComment(commentData: CommentInput): User
    deleteComment(commentId: ID): User
    addLocal(localsData: localsInput): Locals
  }
`;

module.exports = typeDefs;
