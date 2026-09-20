const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = "mongodb+srv://gsdhoni2000:jpR9eO0WSlDYPj6B@namastenode.ckfu4.mongodb.net/PujaSetu" || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pujasetu';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`✨ Connected to MongoDB: ${conn.connection.host} (${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection notice: ${error.message}`);
    console.log('💡 Note: You can paste your cloud MongoDB Atlas connection string in backend/.env (MONGODB_URI).');
    console.log('🛡️ The backend will continue running with full in-memory fallback capabilities!');
    return null;
  }
};

const getStatus = () => {
  return isConnected && mongoose.connection.readyState === 1;
};

module.exports = { connectDB, getStatus };
