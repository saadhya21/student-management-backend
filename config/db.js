const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('node:dns');

// Load environment variables
dotenv.config();

/**
 * Connects to MongoDB using Mongoose.
 * Validates MONGODB_URI, configures DNS if specified, and handles connection errors safely.
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  // Validate that MONGODB_URI is provided and not an empty placeholder
  if (!mongoURI || mongoURI.trim() === '' || mongoURI.includes('your_mongodb_connection_string') || mongoURI.includes('<username>')) {
    console.error('Error: MONGODB_URI is missing or not configured in your .env file.');
    console.error('Please add a valid MongoDB connection string to .env (see .env.example).');
    process.exit(1);
  }

  // Configure custom DNS servers if provided in environment variables (resolves SRV lookup issues)
  if (process.env.DNS_SERVERS) {
    const servers = process.env.DNS_SERVERS.split(',').map((s) => s.trim()).filter(Boolean);
    if (servers.length > 0) {
      dns.setServers(servers);
    }
  }

  try {
    // Attempt database connection
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    // Clean any accidental credentials from the error message before displaying
    let safeErrorMessage = error.message || 'Unknown database connection error';
    safeErrorMessage = safeErrorMessage.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');

    console.error(`MongoDB connection error: ${safeErrorMessage}`);
    process.exit(1);
  }
};

module.exports = connectDB;
