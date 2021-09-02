const path = require('path');

const express = require('express');

const app = express();

const userRoutes = require('./routes/user');
const mainRoutes = require('./routes/main');

app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoutes);
app.use(mainRoutes);

app.listen(3000);
