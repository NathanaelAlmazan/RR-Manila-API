import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { merge } from 'lodash';

// project schema
import {
    typeDefs as AccreditedBanks,
    resolvers as accreditedBankResolvers
} from "./accredited-banks";
import {
  typeDefs as CitizenCharter,
  resolvers as citizenCharterResolvers
} from "./citizen-charter";

const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const schema = makeExecutableSchema({ 
  typeDefs: [Query, AccreditedBanks, CitizenCharter], 
  resolvers: merge(accreditedBankResolvers, citizenCharterResolvers)
});

const server = new ApolloServer({ schema });
  
startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.authorization }),
    listen: { port: 5000, host: "0.0.0.0" },
}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
}).catch(err => {
    console.log(err);
});