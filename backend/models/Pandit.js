const mongoose = require('mongoose');

const panditSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Pandit name is required'],
      trim: true,
    },
    initials: {
      type: String,
      default: 'PT',
    },
    gurukul: {
      type: String,
      required: true,
      trim: true,
    },
    experienceYears: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    reviewsCount: {
      type: Number,
      default: 150,
    },
    tradition: {
      type: String,
      required: true,
      trim: true,
    },
    languages: [
      {
        type: String,
        trim: true,
      },
    ],
    includes: {
      type: String,
      default: 'Complete Vedic Vidhi & Havan',
    },
    dakshina: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      default: '+91 98765-XXXXX',
    },
    verified: {
      type: Boolean,
      default: true,
    },
    avatarBg: {
      type: String,
      default: 'orange',
    },
    pujas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puja',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pandit', panditSchema);
