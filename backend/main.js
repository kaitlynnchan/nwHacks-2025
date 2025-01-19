const express = require('express');
const bodyParser = require('body-parser');

const connectDB = require('./database');
const routes = require('./routes/routes');
const challengeCronJob = require('./services/challengeCronJob');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

challengeCronJob();

app.use('/api/', routes);

app.listen(PORT, () => {
    console.log('Server started on port 3000');
});