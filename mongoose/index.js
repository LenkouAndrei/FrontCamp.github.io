const mongoose = require('mongoose');

const uri = 'string path to db';
mongoose.connect(uri);

const db = mongoose.connection;

model.exports = mongoose;