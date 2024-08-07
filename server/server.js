require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
// const bcryptjs = require('bcryptjs')

const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers')
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => ({
    models: {
      User,
      Book,
      Bookclub,
    },
  }),

});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client')));

    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../client/index.html'));
    });
  }

  // Synchronize models with the database
  db.sync({force:false}).then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};


// Call the async function to start the server
startApolloServer();