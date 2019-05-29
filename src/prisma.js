const { Prisma } = require("prisma-binding");

const prisma = new Prisma({
	typeDefs: "src/generated/prisma.graphql",
	//endpoint:	"https://news-server-prisma-d34d3feb97.herokuapp.com/news-prisma/dev"
	endpoint: "http://localhost:4466"
});

module.exports = prisma;
