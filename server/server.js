const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/team', require('./routes/teamRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/memes', require('./routes/memeRoutes'));
app.use('/api/games', require('./routes/gameRoutes'));

app.get('/', (req, res) => res.send('ACIT API is running...'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));