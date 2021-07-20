const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
// const schema = require("./schema/schema");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index")

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(
    "mongodb+srv://vinay:Vinay123@gqllearn.ktgdn.mongodb.net/familiar?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server is running at ${res.url}`);
});
