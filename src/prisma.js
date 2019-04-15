const { Prisma } = require("prisma-binding");

const prisma = new Prisma({
	typeDefs: "src/generated/schema.graphql",
	endpoint: "https://news-server-prisma-d34d3feb97.herokuapp.com/news-prisma/dev"
});

module.exports = prisma;
