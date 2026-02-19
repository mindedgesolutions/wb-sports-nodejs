import { Request, Response } from 'express';
import { authService } from '@/auth/services/auth.service';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  public async register(req: Request, res: Response) {
    const data = await authService.register(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created successfully', data });
  }

  // -----------------------------

  public async login(req: Request, res: Response) {
    const data = await authService.login(req.body);

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Login successful', data });
  }

  // -----------------------------

  public async refreshToken(req: Request, res: Response) {}
}

export const authController: AuthController = new AuthController();
