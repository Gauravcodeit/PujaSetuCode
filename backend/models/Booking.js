const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    puja: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Puja',
      required: [true, 'Puja reference is required'],
    },
    pandit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pandit',
      required: [true, 'Pandit reference is required'],
    },
    pujaTitle: {
      type: String,
      required: true,
    },
    panditName: {
      type: String,
      required: true,
    },
    panditPhone: {
      type: String,
      default: '+91 98765-XXXXX',
    },
    muhuratDate: {
      type: String,
      required: [true, 'Puja date is required'],
    },
    muhuratSlot: {
      type: String,
      required: [true, 'Muhurat time slot is required'],
    },
    devotee: {
      fullName: {
        type: String,
        required: [true, 'Devotee full name is required'],
      },
      gotra: {
        type: String,
        default: '',
      },
      phone: {
        type: String,
        required: [true, 'Devotee phone is required'],
      },
      email: {
        type: String,
        required: [true, 'Devotee email is required'],
      },
    },
    venue: {
      flat: {
        type: String,
        required: [true, 'Flat / Building is required'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      pincode: {
        type: String,
        required: [true, 'Pincode is required'],
      },
      landmark: {
        type: String,
        default: '',
      },
    },
    pricing: {
      dakshina: {
        type: Number,
        required: true,
      },
      samagriFee: {
        type: Number,
        default: 1200,
      },
      platformFee: {
        type: Number,
        default: 99,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
