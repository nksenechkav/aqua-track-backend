import Joi from 'joi';

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  name: Joi.string().min(3).max(20).messages(),
  weight: Joi.number().min(0).max(300),
  photo: Joi.string(),
  gender: Joi.string().valid('woman', 'man'),
  activeSportTime: Joi.number().min(0).max(24),
});
