const express = require('express')
const app = express()
const news = require('./news.json')
const port = 3000

app.get('/', function (req, res) {
  console.log('index', { title: '111', message: 'Hello NodeJS' });
})

app.get('/news', function (req, res) {
  console.log(news);
})

app.get('/news/:id', function (req, res) {
  const newsId = req.params.id;
  if (news[newsId]) {
    console.log(news[newsId]);
  } else {
    console.log('Error');
  }
})

app.post('/news', (req, res) => {
  res.status(200).json({ type: req.method });
});

app.put('/news/:id', (req, res) => {
  let blogId = req.params.id;
  res.status(200).json({ type: req.method, id: blogId });
});

app.delete('/news/:id', (req, res) => {
  let blogId = req.params.id;
  res.status(200).json({ type: req.method, id: blogId });
});

routes.use(function (req, res) {
  if (res.status(404)) {
    console.log('Error: Page not found')
  }
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})