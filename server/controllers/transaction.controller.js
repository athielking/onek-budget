
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
  remove,
  aggregateType,
  aggregateCategory,
  aggregateSubcategory,
  aggregateCategoryByType,
  aggregateSubcategoryByType
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
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
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

async function aggregateType(viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');

  const pipeline = [
    {
      '$match': {
        'date' : {
          '$gte': start.toDate(),
          '$lt': end.toDate()
        }
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

async function aggregateCategory(viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');

  const pipeline = [
    {
      '$match': {
        'date' : {
          '$gte': start.toDate(),
          '$lt': end.toDate()
        }
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

async function aggregateSubcategory(viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');

  const pipeline = [
    {
      '$match': {
        'date' : {
          '$gte': start.toDate(),
          '$lt': end.toDate()
        }
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

async function aggregateCategoryByType(viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');

  const match = {
    'date' : {
      '$gte': start.toDate(),
      '$lt': end.toDate()
    }
  }; 

  const pipeline = [
    {
      '$match': match
    }, 
    {
      '$group': {
        '_id': { '$concat': [ '$type','$category']},
        'type': {'$first': '$type'},
        'category': { '$first': '$category' },
        'total': { '$sum': '$amount'}
      }
    }];

  return await Transaction.aggregate(pipeline)
}

async function aggregateSubcategoryByType(viewDate) {
  var start = moment(viewDate, "YYYY-MM-DD").date(1);
  var end = start.clone().add(1, 'month');
  const match = {
    'date' : {
      '$gte': start.toDate(),
      '$lt': end.toDate()
    }
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