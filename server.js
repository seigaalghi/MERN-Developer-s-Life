const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

// CONNECT TO DATABASE

connectDB();

// INIT MIDDLEWARE

app.use(cors());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API is Running'));

// DEFINE ROUTES

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
