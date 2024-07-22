import Joi from 'joi';

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string().min(2).max(30).messages(),
  weight: Joi.number().min(0).max(300),
  photo: Joi.string(),
  gender: Joi.string().valid('woman', 'man'),
  sportHours: Joi.number().min(0).max(24),
  waterAmount: Joi.number().min(0).max(16),
});
