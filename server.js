const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT TO DATABASE

connectDB();

// INIT MIDDLEWARE

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API is Running'));

// DEFINE ROUTES

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
