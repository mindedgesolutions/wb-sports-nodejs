import { Department } from '@/generated/prisma/enums';
import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().email().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username is required',
    'string.email': 'Invalid email',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
  }),
});

// -----------------------------

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
    'string.email': 'Invalid email',
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Mobile number must be 10 digits',
    }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
  }),
  department: Joi.string()
    .valid(...Object.values(Department))
    .required()
    .messages({
      'any.required': 'Department is required',
      'string.empty': 'Department is required',
      'any.only': `Department must be one of the following: ${Object.values(Department).join(', ')}`,
    }),
});
