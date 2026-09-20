const Pandit = require('../models/Pandit');
const Puja = require('../models/Puja');
const { getStatus } = require('../config/db');
const memoryStore = require('../config/memoryStore');

// @desc    Get all pandits (optionally filtered by pujaId)
// @route   GET /api/pandits
// @access  Public
exports.getAllPandits = async (req, res) => {
  try {
    const { pujaId, tradition } = req.query;

    if (getStatus()) {
      let query = {};
      if (tradition) {
        query.tradition = new RegExp(tradition, 'i');
      }

      let pandits = await Pandit.find(query).populate('pujas', 'title slug');

      if (pujaId) {
        let targetPuja;
        if (pujaId.match(/^[0-9a-fA-F]{24}$/)) {
          targetPuja = await Puja.findById(pujaId);
        } else {
          targetPuja = await Puja.findOne({ slug: pujaId });
        }

        if (targetPuja) {
          const pujaSpecific = pandits.filter(
            (p) => p.pujas && p.pujas.some((pu) => pu._id.toString() === targetPuja._id.toString())
          );
          if (pujaSpecific.length > 0) pandits = pujaSpecific;
        }
      }

      return res.status(200).json({
        success: true,
        count: pandits.length,
        data: pandits,
      });
    }

    // Fallback in-memory
    let result = [...memoryStore.pandits];
    if (tradition) {
      result = result.filter((p) => p.tradition.toLowerCase().includes(tradition.toLowerCase()));
    }
    if (pujaId) {
      // Find matching puja in memory
      const targetPuja = memoryStore.pujas.find(
        (p) => p._id.toString() === pujaId || p.slug === pujaId
      );
      if (targetPuja) {
        // Pandits in memoryStore have pujas array
        const matching = result.filter(
          (p) => p.pujas && p.pujas.some((pu) => pu._id.toString() === targetPuja._id.toString() || pu.slug === targetPuja.slug)
        );
        if (matching.length > 0) result = matching;
      }
    }

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching pandits',
    });
  }
};

// @desc    Get single pandit by ID
// @route   GET /api/pandits/:id
// @access  Public
exports.getPanditById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getStatus()) {
      const pandit = await Pandit.findById(id).populate('pujas', 'title slug startingPrice');
      if (!pandit) {
        return res.status(404).json({ success: false, message: 'Pandit not found' });
      }
      return res.status(200).json({ success: true, data: pandit });
    }

    const pandit = memoryStore.pandits.find((p) => p._id.toString() === id);
    if (!pandit) {
      return res.status(404).json({ success: false, message: 'Pandit not found' });
    }

    return res.status(200).json({ success: true, data: pandit });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching pandit',
    });
  }
};
