
const Joi = require('joi');
const Transaction = require('../models/transaction.model');
const moment = require('moment');

const transactionSchema = Joi.object({
  date: Joi.date().required(Joi.ref('date')),
  payee: Joi.string(),
  description: Joi.string(),
  amount: Joi.number().required(Joi.ref('amount')),
  type: Joi.string().allow(''),
  category: Joi.string().allow(''),
  subcategory: Joi.string().allow(''),
})

module.exports = {
  insert,
  getAll,
  get,
  getByDate,
  put,
  patch,
  remove
}

async function insert(transaction) {
  user = await Joi.validate(transaction, transactionSchema, { abortEarly: false });
  
  return await new Transaction(transaction).save();
}

async function getAll() {
  return await Transaction.find();
}

async function get(id) {
  return await Transaction.findById(id);
}

async function getByDate(viewDate) {
  var start = moment(viewDate).day(1);
  var end = start.clone().add(1, 'month');

  return await Transaction.find({
    "date": {
      "$gte": start.toDate(),
      "$lt": end.toDate()
    }
  });
}

async function put(id, transaction) {
  return await Transaction.findByIdAndUpdate(id, transaction);
}

async function patch(id, changes) {
  return await Transaction.findByIdAndUpdate(id, {$set: changes});
}

async function remove(id) {
  return await Transaction.deleteOne({_id: id});
}