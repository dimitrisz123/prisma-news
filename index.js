const { GraphQLServer } = require("graphql-yoga");
const prisma = require("./src/prisma");

const typeDefs = `
  type Query {
    articles: [Article]!
  }

  type Article {
	  id: ID! @unique
	  site: String
	  title: String
	  summary: String
	  prologue: String
	  content: String
	  time: String
  }
`;

const resolvers = {
	Query: {
		articles: async (parent, args, { prisma }, info) => {
			return prisma.query.articles(null);
		}
	}
};

const server = new GraphQLServer({ typeDefs, resolvers, context: { prisma } });
server.start(() => console.log("Server is running on localhost:4000"));
