const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');

// CONNECT TO DATABASE

connectDB();

// INIT MIDDLEWARE

app.use(cors());

app.use(express.json({ extended: false }));

// DEFINE ROUTES

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
