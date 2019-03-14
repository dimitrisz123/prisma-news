const { Prisma } = require("prisma-binding");

const prisma = new Prisma({
	typeDefs: "src/generated/schema.graphql",
	endpoint: "localhost:4466"
});

module.exports = { prisma: prisma };
