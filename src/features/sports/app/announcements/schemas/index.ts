import Joi from 'joi';

export const announcementSchema = Joi.object({
  annType: Joi.string().required().messages({
    'string.empty': 'Announcement type is required',
    'any.required': 'Announcement type is required',
  }),
  annNo: Joi.string().required().messages({
    'string.empty': 'Announcement no. is required',
    'any.required': 'Announcement no. is required',
  }),
  subject: Joi.string().required().max(255).messages({
    'string.empty': 'Subject is required',
    'any.required': 'Subject is required',
    'string.max': 'Subject must be less than or equal to 255 characters',
  }),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional().min(Joi.ref('startDate')).messages({
    'date.min': 'End date cannot be before start date',
  }),
});
