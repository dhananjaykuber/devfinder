require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoute = require('./routes/user');
const profileRoute = require('./routes/profile');

// Initialize app
const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRoute);
app.use('/api/profile', profileRoute);

// production build servering
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Dev Finder api is running!');
  });
}

// Connect to Mongodb & listen on port 4000
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT | 4000, () => {
      console.log('Server listening on port 4000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
