// src/validation/water.js

import Joi from 'joi';

export const createWaterSchema = Joi.object({
  time: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/).required().messages({
      'string.base': 'Time should be a string',
      'string.pattern.base': 'Time should be in the format YYYY-MM-DDTHH:MM:SSZ',
      'any.required': 'Time is required',
  }),
  amount: Joi.number().integer().min(50).max(5000).required().messages({
    'number.base': 'Amount should be a number',
    'number.integer': 'Amount should be an integer',
    'number.min': 'Amount should be at least {#limit}',
    'number.max': 'Amount should be at most {#limit}',
    'any.required': 'Amount is required',
  }),
  userId: Joi.string().messages({
    'string.base': 'User ID should be a string',
  }),
});

export const updateWaterSchema = Joi.object({
  time: Joi.string().min(15).max(30),
  amount: Joi.number().integer().min(50),
  userId: Joi.string(),
});
