import { validNumber } from '@/globals/helpers/formats.helper';
import Joi from 'joi';

export const sportsPersonnelSchema = Joi.object({
  sport: Joi.string().required().max(255).messages({
    'any.required': 'Sport is required',
    'string.empty': 'Sport is required',
    'string.max': 'Sport must be at most 255 characters',
  }),
  name: Joi.string().required().max(255).messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
    'string.max': 'Name must be at most 255 characters',
  }),
  address: Joi.string().optional().allow('').max(500).messages({
    'string.max': 'Address must be at most 500 characters',
  }),
  dob: Joi.date()
    .optional()
    .custom((value, helpers) => {
      if (value > new Date()) return helpers.error('date.future');
      return value;
    }),
  contactOne: Joi.string()
    .optional()
    .allow('')
    .custom((value, helpers) => {
      if (!validNumber(value, 10)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.invalid': 'Contact number must be a valid 10-digit number',
    }),
  contactTwo: Joi.string()
    .optional()
    .allow('')
    .custom((value, helpers) => {
      if (!validNumber(value, 10)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.invalid': 'Contact number must be a valid 10-digit number',
    }),
});
