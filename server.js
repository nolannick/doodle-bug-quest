const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config();
// const db = require('./models');
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/doodlebugquestDB"
mongoose.connect(MONGODB_URI)


require('./routes/api-routes')(app);

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  })
}


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});