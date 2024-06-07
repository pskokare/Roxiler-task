const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  dateOfSale: { type: Date, required: true },
  sold: { type: Boolean, required: true },
  category: { type: String, required: false }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
