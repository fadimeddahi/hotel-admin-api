require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Routes
const hotelRoutes = require('./routes/hotels');
const authRoutes = require('./routes/auth');
const users = require('./routes/users');

// Mount Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', users);

// Base route
app.get('/', (req, res) => {
    res.send('Hotel Admin API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));