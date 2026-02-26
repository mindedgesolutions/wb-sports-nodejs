import { validEmail, validNumber } from '@/globals/helpers/formats.helper';
import Joi from 'joi';

export const wbsCouncilMemberSchema = Joi.object({
  boardType: Joi.string().required().messages({
    'string.empty': 'Board type is required',
    'any.required': 'Board type is required',
  }),
  designationId: Joi.string().required().messages({
    'string.empty': 'Designation ID is required',
    'any.required': 'Designation ID is required',
  }),
  name: Joi.string().required().max(255).messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
    'string.max': 'Name must be at most 255 characters',
  }),
  designationLabel: Joi.string().max(255).allow('').optional().messages({
    'string.max': 'Position must be at most 255 characters',
  }),
  address: Joi.string().max(255).optional().allow('').messages({
    'string.max': 'Address must be at most 255 characters',
  }),
  phone: Joi.string()
    .optional()
    .allow('')
    .custom((value, helpers) => {
      if (value.phone && !validNumber(value.phone, 10)) {
        return helpers.error('any.invalid');
      }
    })
    .messages({
      'any.invalid': 'Phone number must be a valid 10-digit number',
    }),
  email: Joi.string()
    .optional()
    .allow('')
    .custom((value, helpers) => {
      if (value.email && !validEmail(value.email)) {
        return helpers.error('any.invalid');
      }
    })
    .messages({
      'any.invalid': 'Invalid email address',
    }),
  fax: Joi.string()
    .optional()
    .allow('')
    .custom((value, helpers) => {
      if (value.fax && !validNumber(value.fax, 10)) {
        return helpers.error('any.invalid');
      }
    })
    .messages({
      'any.invalid': 'FAX number must be a valid 10-digit number',
    }),
});
