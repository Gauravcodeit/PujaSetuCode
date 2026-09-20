const { pujasData, panditsData } = require('../seed/seedData');

// Generate 24-character hex ID compatible with MongoDB ObjectId format
const makeId = (prefix, num) => {
  return (prefix + '000000000000000000000000' + num.toString(16)).slice(-24);
};

const pujas = pujasData.map((p, index) => ({
  ...p,
  _id: makeId('puja', index + 1),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const pandits = panditsData.map((p, index) => ({
  ...p,
  _id: makeId('pndt', index + 1),
  pujas: pujas.map((puja) => ({ _id: puja._id, title: puja.title, slug: puja.slug })),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const users = [];
const bookings = [];

module.exports = {
  pujas,
  pandits,
  users,
  bookings,
};
