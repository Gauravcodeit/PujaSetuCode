require('dotenv').config();
const mongoose = require('mongoose');
const Puja = require('../models/Puja');
const Pandit = require('../models/Pandit');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { connectDB } = require('../config/db');
const { pujasData, panditsData } = require('./seedData');

const seedDatabase = async () => {
  try {
    const conn = await connectDB();
    if (!conn) {
      console.error('Cannot seed: Database connection unavailable.');
      return;
    }

    console.log('🧹 Clearing existing collections in PujaSetu database...');
    await Puja.deleteMany({});
    await Pandit.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});

    console.log('🌱 Seeding authentic Vedic Pujas...');
    const createdPujas = await Puja.insertMany(pujasData);
    console.log(`✅ Seeded ${createdPujas.length} Pujas`);

    // Assign pujas to pandits
    console.log('🌱 Seeding Verified Pandits...');
    const panditsWithPujas = panditsData.map((pandit) => {
      const assignedPujas = createdPujas.map((p) => p._id);
      return {
        ...pandit,
        pujas: assignedPujas,
      };
    });

    const createdPandits = await Pandit.insertMany(panditsWithPujas);
    console.log(`✅ Seeded ${createdPandits.length} Verified Pandits`);

    console.log('🌱 Seeding Devotee User...');
    const devoteeUser = await User.create({
      name: 'Gaurav Sharma',
      email: 'gaurav@example.com',
      password: 'secretPassword123',
      phone: '+91 98765 43210',
      gotra: 'Kashyap',
      role: 'user',
    });
    console.log(`✅ Seeded Devotee User: ${devoteeUser.name} (${devoteeUser.email})`);

    console.log('🌱 Seeding Sample Confirmed Booking...');
    const sampleBooking = await Booking.create({
      bookingId: '#PS-2026-89421',
      user: devoteeUser._id,
      puja: createdPujas[0]._id,
      pandit: createdPandits[0]._id,
      pujaTitle: createdPujas[0].title,
      panditName: createdPandits[0].name,
      panditPhone: createdPandits[0].phone,
      muhuratDate: '2026-10-15',
      muhuratSlot: 'Brahma Muhurat (06:00 AM - 09:30 AM)',
      devotee: {
        fullName: devoteeUser.name,
        gotra: devoteeUser.gotra,
        phone: devoteeUser.phone,
        email: devoteeUser.email,
      },
      venue: {
        flat: 'Flat 402, Tower B, Patrakar Vihar',
        city: 'Ghaziabad',
        pincode: '201014',
        landmark: 'Near Sacred Shiva Temple',
      },
      pricing: {
        dakshina: 4100,
        samagriFee: 1200,
        platformFee: 99,
        totalAmount: 5399,
      },
      status: 'confirmed',
      notes: 'Please bring sacred Gangajal and fresh mango leaves.',
    });
    console.log(`✅ Seeded Confirmed Booking: ${sampleBooking.bookingId}`);

    console.log('\n======================================================');
    console.log('✨ Vedic Database Seeding into MongoDB Atlas Completed! 🪔');
    console.log('🕉️ Database: PujaSetu');
    console.log(`📦 Collections created & populated: pujas (${createdPujas.length}), pandits (${createdPandits.length}), users (1), bookings (1)`);
    console.log('======================================================\n');
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
  }
};

if (require.main === module) {
  seedDatabase().then(() => {
    mongoose.connection.close();
    process.exit(0);
  });
}

module.exports = seedDatabase;
