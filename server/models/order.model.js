const mongoose = require('mongoose');

const Order = mongoose.model(
  'Order',
  new mongoose.Schema({
    id: String,
    quantity: Number,
    date: Date,
  }),
);

module.exports = Order;
