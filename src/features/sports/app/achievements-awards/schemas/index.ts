import Joi from 'joi';

export const playerAchievementsSchema = Joi.object({
  sport: Joi.string().required().messages({
    'any.required': 'Sport is required',
    'string.empty': 'Sport is required',
  }),
  name: Joi.string().required().max(255).messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
    'string.max': 'Name must be at most 255 characters',
  }),
  description: Joi.string().required().max(500).messages({
    'any.required': 'Description is required',
    'string.empty': 'Description is required',
    'string.max': 'Description must be at most 500 characters',
  }),
});
