import { Response } from 'express';
import { NODE_ENV } from '@/globals/constants';

export function sendTokenToCookie(res: Response, token: string): void {
  res.cookie('jp', token, {
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'lax',
  });
}
