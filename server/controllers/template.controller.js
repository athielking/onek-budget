
const Joi = require('joi');
const Template = require('../models/template.model');

const templateSchema = Joi.object({
  day: Joi.date().required(Joi.ref('day')),
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
  put,
  patch,
  remove
}

async function insert(template) {
  user = await Joi.validate(template, templateSchema, { abortEarly: false });
  
  return await new Template(template).save();
}

async function getAll() {
  return await Template.find();
}

async function get(id) {
  return await Template.findById(id);
}

async function put(id, template) {
  return await Template.findByIdAndUpdate(id, template);
}

async function patch(id, changes) {
  return await Template.findByIdAndUpdate(id, {$set: changes});
}

async function remove(id) {
  return await Template.deleteOne({_id: id});
}