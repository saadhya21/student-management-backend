const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Student Management API is running' });
});

// Mount Student API Routes
app.use('/api/students', studentRoutes);

// Port configuration with fallback
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Connect to database before starting the Express server
    await connectDB();

    // Start Express server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
