const apiKey = "df10c999-9506-4008-84a4-8b2c5985cb56";


const express = require('express');
const { ApolloServer } = require('apollo-server-express'); 
const path = require('path');
const { authMiddleware } = require('./utils/auth'); 
const { typeDefs, resolvers } = require('./schemas'); 
const db = require('./config/connection');
require('dotenv').config({ path: './config/.env' });





const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  //Ensures memory is bounded
  cache: "bounded",
  // Disables persisted queries
  persistedQueries: false,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-08-01",
// });
// app.use(express.static(process.env.STATIC_DIR));

// app.get("/", (req, res) => {
//   const path = resolve(process.env.STATIC_DIR + "/index.html");
//   res.sendFile(path);
// });

// app.get("/config", (req, res) => {
//   res.send({
//     publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
//   });
// });

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "USD",
//       amount: 50,
      
//     });

//     // Send publishable key and PaymentIntent details to client
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     return res.status(400).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// });




// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html')); 
});

// Serve up static assets
app.use('/img', express.static(path.join(__dirname, '../client/src/img')));

// Create a new instance of an Apollo server with the GraphQL schema 

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`); 
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers); 