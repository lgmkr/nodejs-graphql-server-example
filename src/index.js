const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
  Query: {
    info: () => 'this is an api ',
    feed: (root, args, context, info) => context.prisma.links(),
    link: (parent, {id}) => links.find(l => l['id'] === id)
  },
  Mutation: {
    post: (root, args, context, info) => context.prisma.createLink({
      url: args.url,
      description: args.description,
    })
  }
}

const server  = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})
server.start(() => console.log('server is running'))
