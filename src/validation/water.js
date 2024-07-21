// src/validation/water.js

import Joi from 'joi';

export const createWaterSchema = Joi.object({
  time: Joi.string().min(10).max(30).required().messages({
    'string.base': 'Time should be a string',
    'string.min': 'Time should have at least {#limit} characters',
    'string.max': 'Time should have at most {#limit} characters',
    'any.required': 'Time is required',
  }),
  amount: Joi.number().integer().min(50).max(5000).required().messages({
    'number.base': 'Amount should be a number',
    'number.integer': 'Amount should be an integer',
    'number.min': 'Amount should be at least {#limit}',
    'number.max': 'Amount should be at most {#limit}',
    'any.required': 'Amount is required',
  }),
  dailyWaterRequirement: Joi.number().min(0.1).max(10).required().messages({
    'number.base': 'Daily water requirement should be a number',
    'number.min': 'Daily water requirement should be at least {#limit}',
    'number.max': 'Daily water requirement should be at most {#limit}',
    'any.required': 'Daily water requirement is required',
  }),
  userId: Joi.string().messages({
    'string.base': 'User ID should be a string',
  }),
});

export const updateWaterSchema = Joi.object({
  time: Joi.string().min(3).max(20),
  amount: Joi.number().integer().min(50).max(5000),
  dailyWaterRequirement: Joi.number().min(0.50).max(5),
  userId: Joi.string(),
});
