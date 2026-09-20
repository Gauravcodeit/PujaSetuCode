const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const Puja = require('./models/Puja');
const seedDatabase = require('./seed/seeder');

// Routes
const authRoutes = require('./routes/auth.routes');
const pujaRoutes = require('./routes/puja.routes');
const panditRoutes = require('./routes/pandit.routes');
const bookingRoutes = require('./routes/booking.routes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pujas', pujaRoutes);
app.use('/api/pandits', panditRoutes);
app.use('/api/bookings', bookingRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: '🪔 PoojaSetu Vedic API service is running smoothly. ॥ ॐ श्री गणेशाय नमः ॥',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 40px; text-align: center; background: #FFFDF9; color: #1E293B;">
      <h1 style="color: #c2410c;">🪔 PoojaSetu API Backend</h1>
      <p style="color: #64748B;">Vedic Puja & Verified Purohit Booking Platform</p>
      <p style="font-weight: bold; color: #ea580c;">Status: Operational</p>
      <div style="margin-top: 20px;">
        <a style="margin: 0 10px; color: #c2410c;" href="/api/pujas">View Pujas API</a> |
        <a style="margin: 0 10px; color: #c2410c;" href="/api/pandits">View Pandits API</a> |
        <a style="margin: 0 10px; color: #c2410c;" href="/api/health">Health Check</a>
      </div>
    </div>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

// Start Server immediately
const server = app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`🪔 PoojaSetu Backend Server running on port ${PORT}`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`🕉️ Blessing: ॥ ॐ श्री गणेशाय नमः ॥`);
  console.log(`==============================================\n`);

  // Connect to DB asynchronously
  connectDB().then(async (conn) => {
    if (conn) {
      try {
        const pujaCount = await Puja.countDocuments();
        if (pujaCount === 0) {
          console.log('📦 Database is empty. Running initial Vedic data seeding...');
          await seedDatabase();
        }
      } catch (seedErr) {
        console.warn('Auto-seed notice:', seedErr.message);
      }
    }
  });
});
