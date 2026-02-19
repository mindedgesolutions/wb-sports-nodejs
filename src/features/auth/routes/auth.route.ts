import asyncWrapper from '@/globals/core/async.wrapper.core';
import express from 'express';
import { authController } from '@/auth/controllers/auth.controller';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { loginSchema, registerSchema } from '@/auth/schemas/auth.schema';

const authRoute = express.Router();

authRoute.post(
  '/register',
  validateSchema(registerSchema),
  asyncWrapper(authController.register),
);
authRoute.post(
  '/login',
  validateSchema(loginSchema),
  asyncWrapper(authController.login),
);
authRoute.post('/refresh-token', asyncWrapper(authController.refreshToken));

export default authRoute;
