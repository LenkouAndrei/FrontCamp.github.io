var express = require('express');
var router = express.Router();

const News = require('../models/news.model');

const logger = require('../logger/logger');
const helpers = require('../helpers');
const fullUrl = helpers.fullUrl;

router.use(function(req, res, next) {
  logger.info(fullUrl(req));
  next();
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'See articles' });
});

module.exports = router;
