
const express = require('express')
const app = require('./app.js')
const mongoose = require('mongoose')
const port = 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Connect to DATABASE
const DATABASE_URL = process.env.MONGODB_URL || "mongodb://localhost/subscribers";
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.on('open', () => {
    // The connection is successful; you can check the existence of your database here.
    const databaseName = 'subscribers'; // Replace with your database name
    mongoose.connection.db.listCollections({ name: databaseName }).next((err, collinfo) => {
      if (collinfo) {
        console.log(`Database '${databaseName}' exists.`);
      } else {
        console.log(`Database '${databaseName}' does not exist.`);
      }
    });
  });
  
  // Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
