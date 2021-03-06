const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { ApolloServer } = require("apollo-server");
// const express = require('express')
// const app = express()
// const path = require('path')

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
});

// app.use(express.static(path.join(__dirname, "../client/build")));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  });

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server is running at ${res.url}`);
});
