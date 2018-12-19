async function feed(parent, args, context, info) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ],
  } : {}

  const { skip, first, orderBy } = args

  const links = await context.prisma.links({
    where,
    first, // limit
    skip,   // start index
    orderBy
  })

  const count = await context.prisma
    .linksConnection({
      where
    })
    .aggregate()
    .count()

  return {
    links,
    count,
  }
}

module.exports = {
  feed
}
