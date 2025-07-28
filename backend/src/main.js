const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./database');
const userRoutes = require('./routes/users.routes');
// const challengeRoutes = require('./routes/challenges.routes');
// const challengeCronJob = require('./services/challengeCronJob');
const { PORT } = require('../config/config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDB();

// challengeCronJob();

app.use('/api/', userRoutes);
// app.use('/api/', challengeRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});