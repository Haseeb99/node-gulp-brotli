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

// set static folder
app.use(express.static(path.join(__dirname, 'dist')));

// app routes
app.get('/', (req, res) => {
  res.render('main');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
