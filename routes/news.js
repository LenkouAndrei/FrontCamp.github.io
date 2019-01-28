const express = require('express');
const router = express.Router();

const helpers = require('../helpers');
const handleError = helpers.handleError;

const News = require('../models/news.model');

router.get('/', function(req, res, next) {
  News.find({}, function(err, news) {
    res.render('allNews', { news });
  });
});

router.get('/:id', function(req, res, next) {
  News.find({ id: req.params.id }, function(err, news) {
    if (!news.length) {
      return handleError('Article Not Found', next);
    }
    res.render('news', { news });
  });
});

router.post('/', function(req, res, next) {
  const news = new News({
    id: req.body.id,
    title: req.body.title,
    text: req.body.text,
    date: Date.now(),
  });
  news.save(function(err, raw) {
    if (err) handleError('Article Not Saved', next);
    res.send('Article was added');
  });
});

router.post('/:id', function(req, res, next) {
  if (req.body._method === 'put') {
    News.update(
        { id: req.params.id },
        { title: req.body.title, text: req.body.text },
        function(err, raw) {
          if (err) handleError('Article Not Updated', next);
          res.send('Article was updated');
        },
    );
  } else if (req.body._method === 'delete') {
    News.deleteOne({ id: req.params.id }, function(err, raw) {
      if (err) return handleError('News Not Deleted', next);
      res.send('News was deleted');
    });
  }
});

module.exports = router;
