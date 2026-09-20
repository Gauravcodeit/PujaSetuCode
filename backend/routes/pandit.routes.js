const express = require('express');
const router = express.Router();
const { getAllPandits, getPanditById } = require('../controllers/pandit.controller');

router.get('/', getAllPandits);
router.get('/:id', getPanditById);

module.exports = router;
