//import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
  }

  type Query {
    thoughts: [Thought]
    thoughts(username: String): [Thought]
  }
`;

// export typeDEfs
module.exports = typeDefs;
