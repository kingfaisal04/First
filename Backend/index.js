// import cors module
const cors = require("cors");

// import dns module
const dns = require("dns");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

// import express
const express = require("express");

//import mongoose
const mongoose = require("mongoose");

//import dotenv
require("dotenv").config();

// create the server
const server = express();

//Port Number
const PORT = process.env.PORT || 3000;

//MONGO Connection string
const MONGO_URL = process.env.MONGO_URL;

//middleware
server.use(express.json());

//import the router
const usersRoutes = require("./Routes/usersRoutes");
const authRoutes = require("./Routes/authRoutes");

// configure cors
server.use(
  cors({
    origin: ["https://first-backend-sand.vercel.app", "http://localhost:5173"],
  })
);

//register router
server.use(usersRoutes);
server.use(authRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(`Mongo DB connected successfully on ${PORT}`);

    //Start and listen to the server
    server.listen(PORT, () => {
      console.log(`Hey my server just started 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//import controller
