// src/validation/water.js

import Joi from 'joi';

export const createWaterSchema = Joi.object({
  time: Joi.string().min(15).max(30).required().messages({
    'string.base': 'Time should be a string',
    'string.min': 'Time should have at least {#limit} characters',
    'string.max': 'Time should have at most {#limit} characters',
    'any.required': 'Time is required',
  }),
  amount: Joi.number().integer().min(50).required().messages({
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
