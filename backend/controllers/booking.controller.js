const Booking = require('../models/Booking');
const Puja = require('../models/Puja');
const Pandit = require('../models/Pandit');
const User = require('../models/User');
const { getStatus } = require('../config/db');
const memoryStore = require('../config/memoryStore');

const generateBookingId = () => {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `#PS-${year}-${randomDigits}`;
};

// @desc    Create a new Puja Booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
  try {
    const {
      pujaId,
      panditId,
      muhuratDate,
      muhuratSlot,
      devotee,
      venue,
      notes,
    } = req.body;

    if (!pujaId || !panditId) {
      return res.status(400).json({
        success: false,
        message: 'Both Puja and Pandit selections are required',
      });
    }

    if (!muhuratDate || !muhuratSlot) {
      return res.status(400).json({
        success: false,
        message: 'Auspicious Muhurat Date and Time Slot are required',
      });
    }

    if (!devotee || !devotee.fullName || !devotee.phone || !devotee.email) {
      return res.status(400).json({
        success: false,
        message: 'Devotee full name, phone number, and email are required',
      });
    }

    if (!venue || !venue.flat || !venue.city || !venue.pincode) {
      return res.status(400).json({
        success: false,
        message: 'Complete puja venue address (flat/house, city, pincode) is required',
      });
    }

    // Lookup Puja & Pandit
    let puja;
    let pandit;

    if (getStatus()) {
      puja = await Puja.findById(pujaId);
      pandit = await Pandit.findById(panditId);
    } else {
      puja = memoryStore.pujas.find((p) => p._id.toString() === pujaId || p.slug === pujaId);
      pandit = memoryStore.pandits.find((p) => p._id.toString() === panditId);
    }

    if (!puja) {
      return res.status(404).json({ success: false, message: 'Selected Puja not found' });
    }
    if (!pandit) {
      return res.status(404).json({ success: false, message: 'Selected Pandit not found' });
    }

    const cleanEmail = devotee.email.toLowerCase().trim();

    // Resolve or Auto-Associate User ID
    let userId = req.user ? (req.user._id || req.user.id) : null;

    if (!userId && cleanEmail) {
      if (getStatus()) {
        let existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
          userId = existingUser._id;
        } else {
          // Auto-create devotee account so bookings are always associated with a real user
          const newUser = await User.create({
            name: devotee.fullName.trim(),
            email: cleanEmail,
            password: 'PoojaSetuDevotee@' + Math.floor(1000 + Math.random() * 9000),
            phone: devotee.phone ? devotee.phone.trim() : '',
            gotra: devotee.gotra ? devotee.gotra.trim() : '',
            role: 'user',
          });
          userId = newUser._id;
        }
      } else {
        let existingUser = memoryStore.users.find((u) => u.email === cleanEmail);
        if (existingUser) {
          userId = existingUser._id;
        } else {
          const newUser = {
            _id: 'usr_' + Date.now(),
            name: devotee.fullName.trim(),
            email: cleanEmail,
            phone: devotee.phone ? devotee.phone.trim() : '',
            gotra: devotee.gotra ? devotee.gotra.trim() : '',
            role: 'user',
          };
          memoryStore.users.push(newUser);
          userId = newUser._id;
        }
      }
    }

    const dakshina = Number(pandit.dakshina) || Number(puja.startingPrice) || 3500;
    const samagriFee = Number(puja.samagriPrice) || 1200;
    const platformFee = 99;
    const totalAmount = dakshina + samagriFee + platformFee;
    const bookingId = generateBookingId();

    const bookingData = {
      bookingId,
      user: userId,
      puja: puja._id,
      pandit: pandit._id,
      pujaTitle: puja.title,
      panditName: pandit.name,
      panditPhone: pandit.phone || '+91 98765-43210',
      muhuratDate,
      muhuratSlot,
      devotee: {
        fullName: devotee.fullName.trim(),
        gotra: devotee.gotra ? devotee.gotra.trim() : '',
        phone: devotee.phone.trim(),
        email: cleanEmail,
      },
      venue: {
        flat: venue.flat.trim(),
        city: venue.city.trim(),
        pincode: venue.pincode.trim(),
        landmark: venue.landmark ? venue.landmark.trim() : '',
      },
      pricing: {
        dakshina,
        samagriFee,
        platformFee,
        totalAmount,
      },
      status: 'confirmed',
      notes: notes || '',
      createdAt: new Date(),
    };

    let savedBooking;
    if (getStatus()) {
      savedBooking = await Booking.create(bookingData);
    } else {
      savedBooking = {
        ...bookingData,
        _id: 'bk_' + Date.now(),
        puja: puja,
        pandit: pandit,
      };
      memoryStore.bookings.unshift(savedBooking);
    }

    return res.status(201).json({
      success: true,
      message: '॥ ॐ श्री गणेशाय नमः ॥ Puja booking confirmed successfully!',
      data: savedBooking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating booking',
    });
  }
};

// @desc    Get bookings for user or filter by email
// @route   GET /api/bookings
// @access  Public / Protected
exports.getUserBookings = async (req, res) => {
  try {
    if (getStatus()) {
      let query = {};
      if (req.user) {
        query.user = req.user._id;
      } else if (req.query.email) {
        query['devotee.email'] = req.query.email.toLowerCase().trim();
      } else if (req.query.phone) {
        query['devotee.phone'] = req.query.phone.trim();
      }

      const bookings = await Booking.find(query)
        .populate('puja')
        .populate('pandit')
        .populate('user', 'name email phone gotra')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings,
      });
    }

    // Memory Store
    let list = [...memoryStore.bookings];
    if (req.user) {
      list = list.filter((b) => b.user && b.user.toString() === (req.user._id || req.user.id).toString());
    } else if (req.query.email) {
      list = list.filter((b) => b.devotee && b.devotee.email === req.query.email.toLowerCase().trim());
    } else if (req.query.phone) {
      list = list.filter((b) => b.devotee && b.devotee.phone === req.query.phone.trim());
    }

    return res.status(200).json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching bookings',
    });
  }
};

// @desc    Get single booking by ID or booking reference
// @route   GET /api/bookings/:id
// @access  Public
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getStatus()) {
      let booking;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        booking = await Booking.findById(id).populate('puja').populate('pandit').populate('user', 'name email phone');
      } else {
        booking = await Booking.findOne({ bookingId: id }).populate('puja').populate('pandit').populate('user', 'name email phone');
      }

      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      return res.status(200).json({ success: true, data: booking });
    }

    const booking = memoryStore.bookings.find(
      (b) => b.bookingId === id || b._id.toString() === id
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching booking',
    });
  }
};
