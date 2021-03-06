const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  payee: {
    type: String,
  },
  description: {
    type: String,    
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
  },
  category: {
    type: String
  },
  subcategory: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('Transaction', TransactionSchema);
