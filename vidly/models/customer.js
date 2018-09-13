const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('customer', new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    minlength: 5,
    maxlength: 100,
  },
  phone: {
    type: Number,
    min: 1111111111,
    max: 9999999999,
  }
}));

/**
 * @param {Object} data 
 */
function validateCustomer(data) {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string().required(),
    phone: Joi.number().required(),
  };
  return Joi.validate(data, schema);
}

module.exports = {
  Customer,
  validateCustomer
};
