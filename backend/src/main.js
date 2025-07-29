const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./database');
const { router: userRoutes } = require('./routes/users.routes');
const { router: challengeRoutes } = require('./routes/challenges.routes');
// const challengeCronJob = require('./services/challengeCronJob');
const { PORT } = require('../config/config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDB();

// challengeCronJob();

app.use('/api/', userRoutes);
app.use('/api/', challengeRoutes);

app.get('/', (req, res) => {
    return res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});