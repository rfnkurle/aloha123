import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      firstname
      lastname
      zipcode
      location
      email
      liveFeed {
        status
        problem
        createdAt
      }
    }
  }
`;

export const FIND_ALL = gql`
  {
    findAll {
      _id
      firstname
      lastname
      zipcode
      location
      email
      liveFeed {
        _id
        status
        problem
        createdAt
      }
    }
  }
`;

export const FIND_LOCALS = gql`
  {
    findLocals {
      name
      hometown
      image
      whatToKnow
      support
      whereAreYou
    }
  }
`;
