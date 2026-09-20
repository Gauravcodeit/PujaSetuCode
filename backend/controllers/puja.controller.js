const Puja = require('../models/Puja');
const { getStatus } = require('../config/db');
const memoryStore = require('../config/memoryStore');

// @desc    Get all pujas with category filter & search query
// @route   GET /api/pujas
// @access  Public
exports.getAllPujas = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (getStatus()) {
      let query = {};
      if (category && category !== 'All' && category !== 'All Pujas') {
        query.category = category;
      }
      if (search && search.trim() !== '') {
        const searchRegex = new RegExp(search.trim(), 'i');
        query.$or = [
          { title: searchRegex },
          { description: searchRegex },
          { badge: searchRegex },
          { category: searchRegex },
        ];
      }
      const pujas = await Puja.find(query).sort({ startingPrice: 1 });
      return res.status(200).json({
        success: true,
        count: pujas.length,
        data: pujas,
      });
    }

    // Fallback in-memory
    let result = [...memoryStore.pujas];
    if (category && category !== 'All' && category !== 'All Pujas') {
      result = result.filter((p) => p.category === category);
    }
    if (search && search.trim() !== '') {
      const term = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          (p.badge && p.badge.toLowerCase().includes(term))
      );
    }

    result.sort((a, b) => a.startingPrice - b.startingPrice);

    return res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching pujas',
    });
  }
};

// @desc    Get single puja by ID or slug
// @route   GET /api/pujas/:id
// @access  Public
exports.getPujaById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getStatus()) {
      let puja;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        puja = await Puja.findById(id);
      } else {
        puja = await Puja.findOne({ slug: id });
      }

      if (!puja) {
        return res.status(404).json({
          success: false,
          message: 'Puja not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: puja,
      });
    }

    // In-memory lookup
    const puja = memoryStore.pujas.find((p) => p._id.toString() === id || p.slug === id);
    if (!puja) {
      return res.status(404).json({
        success: false,
        message: 'Puja not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: puja,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching puja',
    });
  }
};
