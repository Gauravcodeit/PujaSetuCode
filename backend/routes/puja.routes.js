const express = require('express');
const router = express.Router();
const { getAllPujas, getPujaById } = require('../controllers/puja.controller');

router.get('/', getAllPujas);
router.get('/:id', getPujaById);

module.exports = router;
