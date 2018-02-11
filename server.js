const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/MovieLister";
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./controller/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Use express.static to serve the public folder as a static directory
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', routes);
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
});