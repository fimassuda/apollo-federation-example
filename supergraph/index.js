const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const { ApolloArmor } = require('@escape.tech/graphql-armor');
const { readFileSync } = require('fs');

const supergraphSdl = readFileSync('./supergraph.graphql').toString()

const gateway = new ApolloGateway({
  supergraphSdl
});

const armor = new ApolloArmor({
  maxDepth: {
    n: 3
  }
});

const protection = armor.protect();

const server = new ApolloServer({
  ...protection,
  gateway,
  plugins: [...protection.plugins],
  validationRules: [...protection.validationRules]
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
