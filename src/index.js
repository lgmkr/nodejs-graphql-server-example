const { GraphQLServer } = require('graphql-yoga')

const links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
  Query: {
    info: () => 'this is an api ',
    feed: () => links,
    link: (parent, {id}) => links.find(l => l['id'] === id)
  },
  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${links.length++}`,
        description: args.description,
        url: args.url
      }

      links.push(link)
      return link
    }
  }
}

const server  = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})
server.start(() => console.log('server is running'))
