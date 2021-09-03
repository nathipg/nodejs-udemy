const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

const mainRoutes = require('./routes/main');

app.use(mainRoutes);

app.listen(3000);
