const mongoose = require('../mongoose/index');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    id: String,
    title: String,
    text: String,
    date: Date,
});

const News = mongoose.model('News', newsSchema);

module.exports = News;