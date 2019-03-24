const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');
// const db = require('./models');
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/doodlebugquestDB"
mongoose.connect(MONGODB_URI)
// mongoose.connect('mongodb://localhost/doodlebugquestDB', { useNewUrlParser: true });


require('./routes/api-routes')(app);


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});