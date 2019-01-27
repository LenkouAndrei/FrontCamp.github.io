const mongoose = require('mongoose');

const uri = 'mongodb://localhost:3000/news';
mongoose.connect(uri);

const db = mongoose.connection;

model.exports = mongoose;