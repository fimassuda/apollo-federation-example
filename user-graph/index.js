const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    username: String
    age: Int
    firstName: String
    lastName: String
    email: String
    friends: [User]
  }
`;

const friends = [
  {
    id: "2",
    username: "@ada",
    friends: []
  },
  {
    id: "3",
    username: "@bob",
    friends: [
      {
        id: "2",
        username: "@ada",
        friends: []
      },
      {
        id: "4",
        username: "@sam",
        friends: []
      }
    ]
  },
  {
    id: "4",
    username: "@sam",
    friends: []
  }
]

const resolvers = {
  Query: {
    me() {
      return {
        id: "1",
        username: "@ava",
        firstName: 'Ava',
        lastName: 'Mendes',
        email: 'ava@test.com',
        age: 25,        
        friends 
      }
    }
  },
  User: {
    __resolveReference(user, { fetchUserById }){
      return fetchUserById(user.id)
    }
  }
};

let subgraphSchema = buildSubgraphSchema({typeDefs, resolvers});

const server = new ApolloServer({
  schema: subgraphSchema
});

server.listen(4001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});