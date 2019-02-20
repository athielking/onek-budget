
const Joi = require('joi');
const Transaction = require('../models/transaction.model');

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
  get,
  getAll,
  put,
  remove
}

async function insert(transaction) {
  user = await Joi.validate(transaction, transactionSchema, { abortEarly: false });
  
  return await new Transaction(transaction).save();
}

async function getAll() {
  return await Transaction.find({});
}

async function get(id) {
  return await Transaction.findById(id);
}

async function put(id, transaction) {
  return await Transaction.updateOne({id: id}, transaction);
}

async function remove(id) {
  return await Transaction.deleteOne({id: id});
}