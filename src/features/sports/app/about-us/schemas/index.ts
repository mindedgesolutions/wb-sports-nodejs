import Joi from 'joi';

export const achievementSchema = Joi.object({
  title: Joi.string().required().max(500).messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
    'string.max': 'Title must be at most 500 characters long',
  }),
  description: Joi.string().optional().allow('').max(500).messages({
    'string.max': 'Description must be at most 500 characters long',
  }),
  achievementDate: Joi.date()
    .optional()
    .custom((value, helpers) => {
      if (value > new Date()) return helpers.error('date.future');
      return value;
    })
    .messages({
      'date.base': 'Achievement date must be a valid date',
      'date.future': 'Achievement date cannot be in the future',
    }),
});

// ----------------------

export const adminStructureSchema = Joi.object({
  name: Joi.string().required().max(255).messages({
    'string.empty': 'Role name is required',
    'any.required': 'Role name is required',
    'string.max': 'Role name must be at most 255 characters long',
  }),
});

// ----------------------

export const keyPersonnelSchema = Joi.object({
  name: Joi.string().required().max(255).messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
    'string.max': 'Name must be at most 255 characters long',
  }),
  rank: Joi.string().optional().allow('').max(255).messages({
    'string.max': 'Rank must be at most 255 characters long',
  }),
  designation: Joi.string().required().max(255).messages({
    'string.empty': 'Designation is required',
    'any.required': 'Designation is required',
    'string.max': 'Designation must be at most 255 characters long',
  }),
});
