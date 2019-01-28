const mongoose = require('mongoose');

const mongoDB = 'mongodb://AndyArt:43kPk5iRE2PCTj6@ds231589.mlab.com:31589/local_news';

mongoose.connect(mongoDB);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('connection success');
});

module.exports = mongoose;