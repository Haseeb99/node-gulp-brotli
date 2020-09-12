const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');

// initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// set template engine to handlebars
app.engine('.hbs', expressHbs({ extname: '.hbs', layoutsDir: 'views' }));
app.set('view engine', '.hbs');
app.set('views', 'views');

/* serve Brotli compressed CSS files wheneve there is a request for .css file */
app.get('*.css', (req, res, next) => {
  req.url = req.url + '.br';
  res.set('Content-Encoding', 'br');
  res.set('Content-Type', 'text/css; charset=utf-8');
  next();
});

/* serve Brotli compressed JS files whenever there is a request for .js file */
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.br';
  res.set('Content-Encoding', 'br');
  res.set('Content-Type', 'application/javascript; charset=UTF-8');
  next();
});

// set static folder
app.use(express.static(path.join(__dirname, 'dist')));

// app routes
app.get('/', (req, res) => {
  res.render('main');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
