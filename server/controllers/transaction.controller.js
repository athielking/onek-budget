
const Joi = require('joi');
const Transaction = require('../models/transaction.model');
const moment = require('moment');
const mongoose = require('mongoose');

const transactionSchema = Joi.object({
  date: Joi.date().required(Joi.ref('date')),
  payee: Joi.string(),
  description: Joi.string(),
  amount: Joi.number().required(Joi.ref('amount')),
  type: Joi.string().allow(''),
  category: Joi.string().allow(''),
  subcategory: Joi.string().allow(''),
  templateId: Joi.string().allow('')
})

module.exports = {
  insert,
  getAll,
  get,
  getByDate,
  put,
  patch,
  remove,
  aggregateType,
  aggregateCategory,
  aggregateSubcategory,
  aggregateCategoryByType,
  aggregateSubcategoryByType
}

async function insert(userId, transaction) {
  user = await Joi.validate(transaction, transactionSchema, { abortEarly: false });
  
  transaction.userId = userId;
  return await new Transaction(transaction).save();
}

async function getAll(userId) {
  return await Transaction.find({
    "userId": userId
  });
}

async function get(id) {
  return await Transaction.findById(id);
}

async function getByDate(userId, viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');
  
  return await Transaction.find({
    "date": {
      "$gte": start.toDate(),
      "$lt": end.toDate()
    },
    "userId": userId
  });
}

async function put(id, transaction) {
  return await Transaction.findByIdAndUpdate(id, transaction);
}

async function patch(id, changes) {

  if (Object.keys(changes).findIndex( k => k === 'templateId') && !changes.templateId) {
    return await Transaction.findOneAndUpdate({_id: id}, {$set: changes, $unset: {templateId: 1}});
  }

  return await Transaction.findOneAndUpdate({_id: id}, {$set: changes});
}

async function remove(id) {
  return await Transaction.deleteOne({_id: id});
}

async function aggregateType(userId, viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');

  const pipeline = [
    {
      '$match': {
        'date' : {
          '$gte': start.toDate(),
          '$lt': end.toDate()
        },
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
  return await Transaction.aggregate(pipeline)
}

async function aggregateCategory(userId, viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');

  const pipeline = [
    {
      '$match': {
        'date' : {
          '$gte': start.toDate(),
          '$lt': end.toDate()
        },
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

  return await Transaction.aggregate(pipeline)
}

async function aggregateSubcategory(userId, viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');

  const pipeline = [
    {
      '$match': {
        'date' : {
          '$gte': start.toDate(),
          '$lt': end.toDate()
        },
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

  return await Transaction.aggregate(pipeline)
}

async function aggregateCategoryByType(userId, viewDate) {
  var start = moment(viewDate, 'YYYY-MM-DD').date(1);
  var end = start.clone().add(1, 'month');

  const match = {
    'date' : {
      '$gte': start.toDate(),
      '$lt': end.toDate()
    },
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

  return await Transaction.aggregate(pipeline)
}

async function aggregateSubcategoryByType(userId, viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');
  const match = {
    'date' : {
      '$gte': start.toDate(),
      '$lt': end.toDate()
    },
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

  return await Transaction.aggregate(pipeline)
}