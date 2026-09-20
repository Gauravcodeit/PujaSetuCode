const mongoose = require('mongoose');

const pujaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Puja title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    badge: {
      type: String,
      default: 'Vedic Ritual',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Puja description is required'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Griha Pravesh', 'Festive & Saptami', 'Havans & Yagnas', 'Dosha Nivarana', 'General'],
      default: 'General',
    },
    duration: {
      type: String,
      default: '3.0 Hours',
    },
    panditsCount: {
      type: String,
      default: '1-2 Pandits',
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    samagriPrice: {
      type: Number,
      default: 1200,
    },
    icon: {
      type: String,
      default: '🪔',
    },
    bgEmoji: {
      type: String,
      default: '🏡',
    },
    themeColor: {
      type: String,
      default: 'amber',
    },
    includesText: {
      type: String,
      default: 'Complete Vedic Vidhi with Havan, Sankalp & Prasad',
    },
    checklist: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Puja', pujaSchema);
