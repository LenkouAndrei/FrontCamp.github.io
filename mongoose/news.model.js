const mongoose = require('./index');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    id: String,
    source: String,
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: Date,
});

const NewsSchema = mongoose.model('Article', newsSchema);

model.exports = NewsSchema;