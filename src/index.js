const { readFileSync } = require('fs');
const recurse = require('klaw-sync');
const { join, extname } = require('path');
const { ApolloServer } = require('apollo-server');
const { parse } = require('graphql')

const typeDefs = recurse(join(__dirname, './schema'))
  .filter(x => extname(x.path) === '.graphqls')
  .map(({ path }) => parse(readFileSync(path, { encoding: 'utf8' })));


const resolvers = { Node: { __resolveType: () => 'User' } };

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen()
