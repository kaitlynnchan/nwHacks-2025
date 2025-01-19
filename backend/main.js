const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./database');
const routes = require('./routes/routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use('/', routes);

app.listen(PORT, () => {
    console.log('Server started on port 3000');
});