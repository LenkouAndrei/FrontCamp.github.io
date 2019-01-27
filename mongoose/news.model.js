const mongoose = require('./index');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: String,
    text: String,
    date: Date,
});

const News = mongoose.model('News', newsSchema);

model.exports = News;