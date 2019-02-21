const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    max: 31,
    min: 1,
  },
  payee: {
    type: String,
    required: true
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
}, {
  versionKey: false
});


module.exports = mongoose.model('Template', TemplateSchema);
