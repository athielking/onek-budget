
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
  recur: Joi.number().required(Joi.ref('recur')),
  recurrencePeriod: Joi.string().required(Joi.ref('recurrencePeriod')),
  recurrenceStart: Joi.date().required(Joi.ref('recurrenceStart'))
})

module.exports = {
  insert,
  getAll,
  get,
  put,
  patch,
  remove,
  aggregateType,
  aggregateCategory,
  aggregateSubcategory,
  aggregateCategoryByType,
  aggregateSubcategoryByType
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

async function aggregateType(userId) {
  const pipeline = [
    {
      '$match': {
        'userId': userId
      },
    }, 
    {
      '$group': {
        '_id': '$type',
        'type': { '$first': '$type' },
        'total': { '$sum': '$amount'}
      }
    }];
  return await Template.aggregate(pipeline)
}

async function aggregateCategory(userId) {
  const pipeline = [
    {
      '$match': {
        'userId': userId
      }
    }, 
    {
      '$group': {
        '_id': '$category',
        'category': { '$first': '$category' },
        'total': { '$sum': '$amount'}
      }
    }];

  return await Template.aggregate(pipeline)
}

async function aggregateSubcategory(userId) {
 
  const pipeline = [
    {
      '$match': {
        'userId': userId
      }
    }, 
    {
      '$group': {
        '_id': '$subcategory',
        'subcategory': { '$first': '$subcategory' },
        'total': { '$sum': '$amount'}
      }
    }];

  return await Template.aggregate(pipeline)
}

async function aggregateCategoryByType(userId) {
  
  const match = {
    'userId': userId
  }; 

  const pipeline = [
    {
      '$match': match
    }, 
    {
      '$group': {
        '_id': {'$concat': ['$type','.','$category']},
        'type': {'$first': '$type'},
        'category': {'$first': '$category'},
        'total': { '$sum': '$amount'}
      }
    }];

  return await Template.aggregate(pipeline)
}

async function aggregateSubcategoryByType(userId) {
 
  const match = {
    'userId': userId
  }; 

  const pipeline = [
    {
      '$match': match
    }, 
    {
      '$group': {
        '_id': { '$concat': [ '$type','$category', '$subcategory']},
        'type': { '$first': '$type' },
        'category': { '$first': '$category' },
        'subcategory': { '$first': '$subcategory' },
        'total': { '$sum': '$amount'}
      }
    }];

  return await Template.aggregate(pipeline)
}