const routes = require('express').Router();
const news = require('./news.json');
let logger = require('./logger');

routes.get('/', function (req, res) {
    res.status(200).render('index', { title: 'Node', message: 'Hello NodeJS', description: 'This "Hello World" NodeJs App helps me to interact with NodeJS and Express if you want to read some news - use link below'});
    log(req);
})

routes.get('/news', function (req, res) {
    let newsContent = Object.values(news);
    let newsTitles = newsContent.map(item => item.title);
    console.dir({ title: 'News', news: newsTitles, urls: Object.keys(news) });
    res.status(200).render('allNews', { title: 'News', news: newsTitles, urls: Object.keys(news) });
    log(req);
});

routes.post('/news', function (req, res) {
    res.status(200).json({ type: req.method });
    log(req);
});

routes.get('/news/:id', function (req, res) {
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

routes.put('/news/:id', function (req, res) {
    let newsId = req.params.id;
    res.status(200).json({ type: req.method, id: newsId });
    log(req);
});

routes.delete('/news/:id', function (req, res) {
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

module.exports = routes;
