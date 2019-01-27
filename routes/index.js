const express = require('express');
const router = express.Router();
let logger = require('../logger/logger');

const news = {
  "1": {
    "title": "Belarusian News",
    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "date": "June 26, 2018"
  },
  "2": {
    "title": "Brazil News",
    "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    "date": "October 15, 2017"
  },
  "3": {
    "title": "Bermuda Triangle News",
    "text": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    "date": "November 20, 2017"
  }
};

router.get('/', function (req, res) {
  res.status(200).render('index', { title: 'Node', message: 'Hello NodeJS', description: 'This "Hello World" NodeJs App helps me to interact with NodeJS and Express if you want to read some news - use link below'});
  log(req);
})

router.get('/news', function (req, res) {
  let newsContent = Object.values(news);
  let newsTitles = newsContent.map(item => item.title);
  console.dir({ title: 'News', news: newsTitles, urls: Object.keys(news) });
  res.status(200).render('allNews', { title: 'News', news: newsTitles, urls: Object.keys(news) });
  log(req);
});

router.post('/news', function (req, res) {
  res.status(200).json({ type: req.method });
  log(req);
});

router.get('/news/:id', function (req, res) {
  let newsId = req.params.id;
  let currentNews = news[newsId];
  if (!currentNews) {
    res.status(404).render('pageNotFound', { title: 'Error', message: 'There is no news with such id' })
  } else {
    res.status(200).render('news', {
      title: `News Number ${newsId}`,
      header: currentNews.title,
      text: currentNews.text,
      date: currentNews.date
    });
  }
  log(req);
});

router.put('/news/:id', function (req, res) {
  let newsId = req.params.id;
  res.status(200).json({ type: req.method, id: newsId });
  log(req);
});

router.delete('/news/:id', function (req, res) {
  let newsId = req.params.id;
  res.status(200).json({ type: req.method, id: newsId });
  log(req);
});

let log = (req) => {
  logger.log({
    level: 'info',
    url: req.headers.host + req.url,
    method: req.method,
    date: new Date()
  });
}

module.exports = router;
