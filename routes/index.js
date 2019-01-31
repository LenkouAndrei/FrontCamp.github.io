var express = require('express');
var router = express.Router();

const News = require('../models/news.model');
const controllers = require('../passport/controllers');

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

router.post('/login', controllers.login);
router.post('/register', controllers.register);
router.get('/logout', controllers.logout);

module.exports = router;
