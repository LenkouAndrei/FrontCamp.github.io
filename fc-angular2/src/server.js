var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongoose');
var path = require('path');

var app = express();

var db = mongo.connect('mongodb://AndyArt:43kPk5iRE2PCTj6@ds231589.mlab.com:31589/local_news', function(err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to ${db}, response is ${response}`);
  }
});

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

class Article {
  constructor(args) {
    this.author = args.author;
    this.description = args.description;
    this.publishedAt = args.publishedAt;
    this.title = args.title;
    this.url = args.url;
    this.urlToImage = args.urlToImage;
    this.isCreatedByMe = args.isCreatedByMe;
    this.id = args.id;
  }
}

var ArticlesSchema = new Schema({
  author: String,
  description: String,
  publishedAt: String,
  title: String,
  url: String,
  urlToImage: String,
  isCreatedByMe: Boolean,
  id: {
    type: String,
    unique: true,
  }
}, {versionKey: false});

var model = mongo.model('articles', ArticlesSchema, 'articles');

app.post('/:id', function(req, res, next) {
  if (req.body._method === 'put') {
    model.update(
      { id: req.body.id },
      {
        author: req.body.author,
        description: req.body.description,
        publishedAt: req.body.publishedAt,
        title: req.body.title,
        url: req.body.url,
        urlToImage: req.body.urlToImage,
      },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      },
    );
  } else if (req.body._method === 'delete') {
    model.deleteOne({ id: req.params.id }, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
});

app.post('/', function(req, res) {
  var article = new Article(req.body);
  article.save(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/', function(req, res) {
  model.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/:id', function(req, res, next) {
  model.find({ id: req.params.id }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(8080, function() {
  console.log('Example app listening on port 8080!');
});
